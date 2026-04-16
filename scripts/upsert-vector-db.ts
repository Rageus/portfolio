/// <reference path="../worker-configuration.d.ts" />
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { getPlatformProxy } from "wrangler";

function portfolioScriptTestId(i: number): string {
  return `portfolio-script-test-${i + 1}`;
}

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
	const texts = [
		"I love apples.",
		"I enjoy oranges.",
		"I think pears taste very good.",
		"I hate bananas.",
		"I dislike raspberries.",
		"I despise mangos.",
		"I love Linux.",
		"I hate Windows.",
	];
	const vectors = await makeEmbeddings(texts);
	const { env } = await getPlatformProxy<Env>();
	await env.PORTFOLIO_VECTORIZE.upsert(
		texts.map((text, i) => ({
			id: portfolioScriptTestId(i),
			values: vectors[i],
			metadata: { text },
		})),
	);
	console.log("Finished")
}

main().catch((error) => {
  console.error("Vectorize script failed:", error);
  process.exitCode = 1;
});
