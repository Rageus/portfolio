/// <reference path="../worker-configuration.d.ts" />
import { getPlatformProxy } from "wrangler";

/** Must match `portfolio-index` (384-dim, cosine). */
const VECTOR_DIMENSIONS = 384;
const TEST_VECTOR_ID = "portfolio-script-test-1";
const POLL_INTERVAL_MS = 500;
const POLL_MAX_ATTEMPTS = 40;
/** Search index often lags `getByIds`; poll `query` separately. */
const QUERY_POLL_INTERVAL_MS = 1000;
const QUERY_POLL_MAX_ATTEMPTS = 45;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeTestEmbedding(): number[] {
  const values = new Array<number>(VECTOR_DIMENSIONS);
  for (let i = 0; i < VECTOR_DIMENSIONS; i++) {
    values[i] = 0.3; //Math.sin((i + 1) * 0.01) * 0.1;
  }
  return values;
}

async function main(): Promise<void> {
  const embedding = makeTestEmbedding();
  console.log(embedding)
  const { env, dispose } = await getPlatformProxy<Env>();
  try {
    const index = env.PORTFOLIO_VECTORIZE;
	console.log(TEST_VECTOR_ID)
	console.log(index)

    const upsertResult = await index.upsert([
      {
        id: TEST_VECTOR_ID,
        values: embedding,
      },
    ]);
    console.log("Upsert (async):", upsertResult);

    let visible = false;
    for (let attempt = 0; attempt < POLL_MAX_ATTEMPTS; attempt++) {
      const byId = await index.getByIds([TEST_VECTOR_ID]);
      if (byId.length > 0) {
        visible = true;
        console.log(`Vector readable after ~${attempt * POLL_INTERVAL_MS}ms (getByIds)`);
        break;
      }
      await sleep(POLL_INTERVAL_MS);
    }
    if (!visible) {
      console.warn(
        `Timed out after ${POLL_MAX_ATTEMPTS * POLL_INTERVAL_MS}ms; query may still be empty until the upsert finishes.`,
      );
    }

    let queryResult = await index.query(embedding, {
      topK: 5,
      returnMetadata: "all",
    });
    for (let q = 0; q < QUERY_POLL_MAX_ATTEMPTS; q++) {
      const hit = queryResult.matches.some((m) => m.id === TEST_VECTOR_ID);
      if (hit) {
        if (q > 0) {
          console.log(`Similarity query saw the vector after ~${q * QUERY_POLL_INTERVAL_MS}ms`);
        }
        break;
      }
      await sleep(QUERY_POLL_INTERVAL_MS);
      queryResult = await index.query(embedding, {
        topK: 5,
        returnMetadata: "all",
      });
    }

    console.log("Query matches:", JSON.stringify(queryResult.matches, null, 2));
    console.log("Query count:", queryResult.count);
  } finally {
    await dispose();
  }
  console.log("Finished")
}

main().catch((error) => {
  console.error("Vectorize script failed:", error);
  process.exitCode = 1;
});
