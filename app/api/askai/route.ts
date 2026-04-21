/// <reference path="../../../worker-configuration.d.ts" />

import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ChatGroq } from "@langchain/groq";

const postBodySchema = z.object({
	prompt: z.string().min(1, "prompt must be a non-empty string"),
});

/**
 * POST with JSON body `{ "prompt": string }`.
 * Not exposed as GET: prompts can be long, and model calls are not idempotent/safe in the HTTP sense.
 */
export async function POST(req: Request) {
	let json: unknown;
	try {
		json = await req.json();
	} catch {
		return NextResponse.json({ message: "Invalid JSON body." }, { status: 400 });
	}

	const result = postBodySchema.safeParse(json);

	if (!result.success) {
		return NextResponse.json({ message: "Invalid body." }, { status: 400 });
	}

	const { prompt } = result.data;
	const { env } = await getCloudflareContext({ async: true });
	const embeddings = new HuggingFaceTransformersEmbeddings({
		model: "Xenova/all-MiniLM-L6-v2",
	});
	const [embedding] = await embeddings.embedDocuments([prompt]);

	const model = new ChatGroq({
		model: "llama-3.1-8b-instant",
		temperature: 0.1,
		apiKey: env.GROQ_API_KEY,
	});

	const topK = 3;
	let queryResult = await env.PORTFOLIO_VECTORIZE.query(embedding, {
		topK,
		returnMetadata: "all",
	});

	const portfolioContext = queryResult.matches
		.map((match) => match.metadata?.text)
		.filter((text): text is string => typeof text === "string" && text.length > 0)
		.join("\n\n");

	const res = await model.invoke([
		new SystemMessage(
			"You help answer questions about this portfolio site. The user submitted question is inside Question; relevant portfolio excerpts from search are in PortfolioContext.",
		),
		new HumanMessage(`Question:\n${prompt}\n\nPortfolioContext:\n${portfolioContext}`),
	]);

	console.log(res.content)

	return NextResponse.json({ answer: res.content, embedding });
}
