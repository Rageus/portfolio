/// <reference path="../worker-configuration.d.ts" />
import { getPlatformProxy } from "wrangler";

async function makeEmbeddings(ai: Ai, texts: string[]): Promise<number[][]> {
  const result = await ai.run("@cf/baai/bge-small-en-v1.5", { text: texts });
  const vectors = "data" in result ? result.data : undefined;
  if (!vectors) {
    throw new Error("Workers AI returned no embeddings.");
  }
  console.log(texts);
  console.log("embedding dims:", vectors[0]?.length, "count:", vectors.length);

  return vectors;
}

async function main(): Promise<void> {
	const { env } = await getPlatformProxy<CloudflareEnv>();
	console.log("after load env")
	const question = [
		"What did Rasmus build at Singularity Group?"
	];
	const queryVectors = await makeEmbeddings(env.AI, question);
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
