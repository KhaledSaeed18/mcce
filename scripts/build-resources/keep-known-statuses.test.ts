import { describe, expect, it } from "vitest";
import { keepKnownStatuses } from "./keep-known-statuses";

describe("keepKnownStatuses", () => {
  it("keeps the previous result when the fresh probe is unchecked", () => {
    const merged = keepKnownStatuses(
      new Map([["https://a.test", "unchecked"]]),
      new Map([["https://a.test", "ok"]])
    );
    expect(merged.get("https://a.test")).toBe("ok");
  });

  it("takes a definite fresh result over the previous one", () => {
    const merged = keepKnownStatuses(
      new Map([
        ["https://a.test", "broken"],
        ["https://b.test", "ok"],
      ]),
      new Map([
        ["https://a.test", "ok"],
        ["https://b.test", "broken"],
      ])
    );
    expect(merged.get("https://a.test")).toBe("broken");
    expect(merged.get("https://b.test")).toBe("ok");
  });

  it("stays unchecked when there is no previous result", () => {
    const merged = keepKnownStatuses(
      new Map([["https://a.test", "unchecked"]]),
      new Map()
    );
    expect(merged.get("https://a.test")).toBe("unchecked");
  });
});
