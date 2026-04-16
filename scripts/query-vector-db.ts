
/// <reference path="../worker-configuration.d.ts" />
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { getPlatformProxy } from "wrangler";

async function makeEmbeddings(texts: string[]): Promise<number[][]> {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    model: "Xenova/all-MiniLM-L6-v2",
  });
  const vectors = await embeddings.embedDocuments(texts);
  console.log(texts);
  console.log("embedding dims:", vectors[0]?.length, "count:", vectors.length);

  return vectors;
}

async function main(): Promise<void> {
	const { env } = await getPlatformProxy<Env>();
	console.log("after load env")
	const question = [
		"What fruits does the person hate?"
	];
	const queryVectors = await makeEmbeddings(question);
	const queryVector = queryVectors[0];

	const topK = 3;
	let queryResult = await env.PORTFOLIO_VECTORIZE.query(queryVector, {
		topK,
		returnMetadata: "all",
	});

	console.log("Query matches:", JSON.stringify(queryResult.matches, null, 2));
	console.log("Query count:", queryResult.count);
}

main().catch((error) => {
  console.error("Vectorize script failed:", error);
  process.exitCode = 1;
});
