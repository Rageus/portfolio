import { NextResponse } from "next/server";
import { z } from "zod";

const postBodySchema = z.object({
	name: z.string(),
});

export async function GET() {
	return NextResponse.json({message: "Hello World!"})
}

export async function POST(req: Request) {
	const result = postBodySchema.safeParse(await req.json());

	if (!result.success) {
		return NextResponse.json({ message: "Invalid body." }, { status: 400 });
	}

	const { name } = result.data;

	return NextResponse.json({
		message: `hello ${name}, this was send from the API.`,
	});
}