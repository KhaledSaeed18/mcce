import { describe, expect, it } from "vitest";
import { statusFromResponse } from "./links";

describe("statusFromResponse", () => {
  it("maps 2xx to ok, redirects to redirect, and 4xx or 5xx to broken", () => {
    expect(statusFromResponse(200, false)).toBe("ok");
    expect(statusFromResponse(200, true)).toBe("redirect");
    expect(statusFromResponse(404, false)).toBe("broken");
    expect(statusFromResponse(503, true)).toBe("broken");
  });

  it("leaves bot blocks and rate limits unchecked", () => {
    expect(statusFromResponse(403, false)).toBe("unchecked");
    expect(statusFromResponse(429, false)).toBe("unchecked");
  });
});
