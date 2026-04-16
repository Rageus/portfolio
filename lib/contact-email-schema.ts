import { z } from "zod";

/** Same limits as used by `POST /api/emails` via `contactEmailSchema`. */
export const CONTACT_FIELD_LIMITS = {
	name: { min: 1, max: 50 },
	email: { min: 1, max: 50 },
	subject: { min: 3, max: 100 },
	message: { min: 3, max: 1000 },
} as const;

export const contactEmailSchema = z.object({
	name: z.string().min(CONTACT_FIELD_LIMITS.name.min).max(CONTACT_FIELD_LIMITS.name.max),
	email: z
		.string()
		.min(CONTACT_FIELD_LIMITS.email.min)
		.max(CONTACT_FIELD_LIMITS.email.max)
		.email(),
	subject: z.string().min(CONTACT_FIELD_LIMITS.subject.min).max(CONTACT_FIELD_LIMITS.subject.max),
	message: z.string().min(CONTACT_FIELD_LIMITS.message.min).max(CONTACT_FIELD_LIMITS.message.max),
});
