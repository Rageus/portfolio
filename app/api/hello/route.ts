import { NextResponse } from "next/server";


export async function GET() {
	return NextResponse.json({message: "Hello World!"})
}


export async function POST(req: Request) {
	const data = await req.json()
	const { name } = data

	return NextResponse.json({message: `hello ${name}, this was send from the API.`})
}