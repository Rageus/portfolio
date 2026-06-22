/// <reference path="../../../worker-configuration.d.ts" />

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
	const embeddingResult = await env.AI.run("@cf/baai/bge-small-en-v1.5", { text: prompt });
	const embedding = "data" in embeddingResult ? embeddingResult.data?.[0] : undefined;
	if (!embedding) {
		return NextResponse.json({ message: "Failed to generate embedding." }, { status: 502 });
	}

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
			"You answer questions about Rasmus on his portfolio site. The user's question is in Question; relevant facts about Rasmus are in PortfolioContext. " +
				"Answer directly using those facts, in the same grammatical person as the question: if asked with 'you' (e.g. 'How many years of experience do you have?'), reply as Rasmus in first person (e.g. 'I have 8+ years of experience.'). " +
				"If asked about 'Rasmus' or 'he' in third person, reply in third person (e.g. 'Rasmus has 8+ years of experience.'). " +
				"Never mention 'context', 'excerpts', 'the provided information', or that you are retrieving data — just answer as if you know it. " +
				"If PortfolioContext doesn't contain the answer, say you don't have that information rather than guessing.",
		),
		new HumanMessage(`Question:\n${prompt}\n\nPortfolioContext:\n${portfolioContext}`),
	]);

	console.log(res.content)

	return NextResponse.json({ answer: res.content, embedding });
}
