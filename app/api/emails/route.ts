import { NextResponse } from "next/server";
import { z } from "zod"
import { Resend } from 'resend';
import Email from "@/components/email";

const schema = z.object({
  name: z.string().min(1).max(50),
  mail: z.email().min(1).max(50),
  subject: z.string().min(3).max(100),
  message: z.string().min(3).max(1000),
});

export async function POST(req: Request) {
	const apiKey = process.env.RE_SEND_API_KEY;
	if (!apiKey) {
		console.error("RE_SEND_API_KEY is not set");
		return NextResponse.json(
			{ message: "Server configuration error." },
			{ status: 500 }
		);
	}
	const resend = new Resend(apiKey);

	const data = await req.json();

	const result = schema.safeParse({
		name: data.name,
		mail: data.email,
		subject: data.subject,
		message: data.message,
	});

  if (!result.success) {
    console.log(result.error ?? "Validation failed.")

    return NextResponse.json(
      { message: "Validation failed." },
      { status: 403 }
    );
  }


  const resp = await resend.emails.send({
    from: 'contact@forward.rasmus-diessel.com',
    to: 'contact@rasmus-diessel.com',
    replyTo: result.data.mail,
    subject: result.data.subject,
    text: result.data.message
  });

  if (resp.error) {
    console.log(resp.error)

    return NextResponse.json(
      { message: resp.error.message ?? "Failed to send email." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: `Hello ${result.data.name}, your message was sent.`,
  });
}
