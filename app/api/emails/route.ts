import { NextResponse } from "next/server";
import { z } from "zod"
import { Resend } from 'resend';
import { CONTACT_EMAIL, RESEND_FROM_EMAIL } from "@/lib/constants";
import { contactEmailSchema } from "@/lib/contact-email-schema";

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

	const result = contactEmailSchema.safeParse({
		name: data.name,
		email: data.email,
		subject: data.subject,
		message: data.message,
	});

  if (!result.success) {
    console.log(result.error ?? "Validation failed.");

    const fe = z.flattenError(result.error).fieldErrors;
    const fieldErrors: Record<string, string[]> = {};
    if (fe.name?.length) fieldErrors.name = fe.name;
    if (fe.email?.length) fieldErrors.email = fe.email;
    if (fe.subject?.length) fieldErrors.subject = fe.subject;
    if (fe.message?.length) fieldErrors.message = fe.message;

    return NextResponse.json(
      { message: "Validation failed.", fieldErrors },
      { status: 403 }
    );
  }


  const resp = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: CONTACT_EMAIL,
    replyTo: result.data.email,
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
