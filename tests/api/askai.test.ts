import { describe, expect, it } from "vitest";
import { GET, POST } from "../../app/api/askai/route";

const MOCK_ANSWER =
	"This is a mock AI answer. The askai endpoint will run an LLM here later.";

describe("GET /api/askai", () => {
	it("returns the mock answer", async () => {
		const res = await GET();

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ answer: MOCK_ANSWER });
	});
});

describe("POST /api/askai", () => {
	it("returns the mock answer", async () => {
		const req = new Request("http://localhost/api/askai", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ question: "What is 2+2?" }),
		});

		const res = await POST(req);

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ answer: MOCK_ANSWER });
	});
});
