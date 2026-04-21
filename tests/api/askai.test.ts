import { describe, expect, it } from "vitest";
import { POST } from "../../app/api/askai/route";

describe("POST /api/askai", () => {
	it(
		"returns an LLM answer and an embedding vector for the prompt",
		async () => {
			const req = new Request("http://localhost/api/askai", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: "What fruits do I like?" }),
			});

			const res = await POST(req);

			expect(res.status).toBe(200);
			const body = (await res.json()) as {
				answer: string;
				embedding: number[];
			};

			expect(typeof body.answer).toBe("string");
			expect(body.answer.length).toBeGreaterThan(0);
			expect(Array.isArray(body.embedding)).toBe(true);
			// Xenova/all-MiniLM-L6-v2
			expect(body.embedding.length).toBe(384);
			expect(body.embedding.every((n) => typeof n === "number" && Number.isFinite(n))).toBe(
				true,
			);
		},
		120_000,
	);

	it("returns 400 when prompt is missing", async () => {
		const req = new Request("http://localhost/api/askai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({}),
		});

		const res = await POST(req);

		expect(res.status).toBe(400);
	});

	it("returns 400 when body is not valid JSON", async () => {
		const req = new Request("http://localhost/api/askai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: "not-json",
		});

		const res = await POST(req);

		expect(res.status).toBe(400);
	});
});
