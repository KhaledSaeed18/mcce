import { describe, expect, it } from "vitest";
import { stringifySearchValue } from "./search-serializer";

describe("stringifySearchValue", () => {
  it("joins string lists with commas", () => {
    expect(stringifySearchValue(["free", "student"])).toBe("free,student");
  });

  it("keeps other values as JSON", () => {
    expect(stringifySearchValue({ a: 1 })).toBe('{"a":1}');
    expect(stringifySearchValue(3)).toBe("3");
  });
});
