import type { $ZodIssue } from "zod/v4/core";

export type ContactFieldKey = "name" | "email" | "subject" | "message";

export const CONTACT_FIELD_KEYS: readonly ContactFieldKey[] = [
	"name",
	"email",
	"subject",
	"message",
];

export function firstIssuePerContactField(
	issues: readonly $ZodIssue[],
): Partial<Record<ContactFieldKey, $ZodIssue>> {
	const out: Partial<Record<ContactFieldKey, $ZodIssue>> = {};
	for (const issue of issues) {
		const k = issue.path[0];
		if (k !== "name" && k !== "email" && k !== "subject" && k !== "message") continue;
		if (out[k]) continue;
		out[k] = issue;
	}
	return out;
}

type ContactT = (
	key:
		| "validation-generic"
		| "validation-required"
		| "validation-too-short"
		| "validation-too-long"
		| "validation-email-invalid",
	values?: Record<string, number | string>,
) => string;

export function contactZodIssueToMessage(issue: $ZodIssue, t: ContactT): string {
	switch (issue.code) {
		case "too_small": {
			if (issue.origin === "string") {
				const min = Number(issue.minimum);
				return t("validation-too-short", { min });
			}
			break;
		}
		case "too_big": {
			if (issue.origin === "string") {
				const max = Number(issue.maximum);
				return t("validation-too-long", { max });
			}
			break;
		}
		case "invalid_format": {
			if (issue.format === "email") {
				return t("validation-email-invalid");
			}
			break;
		}
		case "invalid_type": {
			if (issue.expected === "string") {
				return t("validation-required");
			}
			break;
		}
		default:
			break;
	}
	return t("validation-generic");
}
