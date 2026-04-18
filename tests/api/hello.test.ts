import { describe, expect, it } from "vitest";
import { GET, POST } from "../../app/api/hello/route";

describe("GET /api/hello", () => {
	it("returns Hello World", async () => {
		const res = await GET();

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ message: "Hello World!" });
	});
});

describe("POST /api/hello", () => {
	it("returns a personalized message for a valid body", async () => {
		const req = new Request("http://localhost/api/hello", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: "Ada" }),
		});

		const res = await POST(req);

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({
			message: "hello Ada, this was send from the API.",
		});
	});

	it("returns 400 for an invalid body", async () => {
		const req = new Request("http://localhost/api/hello", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({}),
		});

		const res = await POST(req);

		expect(res.status).toBe(400);
		expect(await res.json()).toEqual({ message: "Invalid body." });
	});
});
