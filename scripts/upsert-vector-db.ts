/// <reference path="../worker-configuration.d.ts" />
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { getPlatformProxy } from "wrangler";
import { CONTACT_EMAIL, GITHUB_REPO_URL, LINKEDIN_PROFILE_URL } from "../lib/constants";

function portfolioContentId(i: number): string {
  return `portfolio-content-${i + 1}`;
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

const PORTFOLIO_CONTENT = [
  "Rasmus Dießel is a senior software engineer with 8+ years of experience across Cloud, AI, and Game Development. He has strong problem-solving skills and a sharp eye for detail, designing and shipping scalable, performant, robust, and secure systems end-to-end, and is comfortable tracking down bugs in unfamiliar codebases. He does his best work in startup environments where he is given room to take ownership and get creative. He is open to freelance contracting.",

  "Since January 2023, Rasmus has been a Senior AI Engineer at Singularity Group, spearheading backend development for an AI media platform, collaborating closely with designers and fellow engineers, and mentoring junior engineers.",

  "At Singularity Group, Rasmus designed and implemented a serverless AWS microservice cloud architecture for AI image and video generation powering the website Athene GPT (athenegpt.ai). He implemented secure authentication and authorization to safeguard sensitive user data, researched open-source AI projects to significantly enhance quality, and mentored a team of three React frontend developers. He collaborated with twitch.tv to integrate features on their platform (see viphype.net for details). More than 300 influencers created social media content indistinguishable from real content, and 300,000 users generated over 2 million AI images. Tech stack: AWS, Go, Python, TypeScript, React, LLMs, ComfyUI, CI/CD.",

  "From August to December 2022, Rasmus was Lead Unity Developer at Singularity Group, managing two developers and customer support, shipping bug fixes and user-requested features for the Unity Asset Hot Reload (hotreload.net). Hot Reload earned a 5-star rating and Verified Solution status on the Unity Asset Store, and has generated more than $500k in yearly revenue, still to this day. Tech stack: Unity, C#, .NET, macOS, CI/CD, Docker.",

  "From January 2018 to December 2022, Rasmus was Senior Unity Developer at Singularity Group, adding core features to the mobile game Mobile Minigames (mobileminigames.com), including chat, in-app purchases, a performant 3D Minecraft-like block editor, and analytics data pipelines. He managed a team of four developers, performed security code reviews, managed the Facebook dashboard, and fixed native plugins. The game achieved over 4 million downloads across the Apple App Store and Google Play, generated more than $2 million in revenue, and reached the No. 1 Top Grossing Game spot in the Philippines. Tech stack: Unity, AWS, CI/CD, Data Science, Docker.",

  "Rasmus's education: B.A. Philosophy-Neuroscience-Cognition at Otto-von-Guericke-University Magdeburg (10/2016 - 01/2018, discontinued); Voluntary Social Year (FSJ) at Klinikum Lehrte/Lebenshilfe Hildesheim (06/2015 - 06/2016); B.Sc. Computer Science at Leibniz University Hanover (10/2014 - 05/2015, discontinued); Abitur at Gymnasium Sarstedt (07/2014).",

  `You can contact Rasmus by email at ${CONTACT_EMAIL}, on LinkedIn at ${LINKEDIN_PROFILE_URL}, or check his code on GitHub at ${GITHUB_REPO_URL}. He is open to freelance contracting work.`,
];

async function main(): Promise<void> {
	const vectors = await makeEmbeddings(PORTFOLIO_CONTENT);
	const { env } = await getPlatformProxy<Env>();
	await env.PORTFOLIO_VECTORIZE.upsert(
		PORTFOLIO_CONTENT.map((text, i) => ({
			id: portfolioContentId(i),
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
