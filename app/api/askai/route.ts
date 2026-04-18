import { NextResponse } from "next/server";

/** Placeholder until this route calls an LLM. */
const MOCK_ANSWER =
	"This is a mock AI answer. The askai endpoint will run an LLM here later.";

export async function GET() {
	return NextResponse.json({ answer: MOCK_ANSWER });
}

export async function POST(_req: Request) {
	return NextResponse.json({ answer: MOCK_ANSWER });
}
