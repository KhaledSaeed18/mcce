import { describe, expect, it } from "vitest";
import {
  readOptionalList,
  readOptionalOneOf,
  readOptionalQuery,
  readOptionalString,
} from "./search-params";

describe("readOptionalString", () => {
  it("returns non-empty strings only", () => {
    expect(readOptionalString("a")).toBe("a");
    expect(readOptionalString("")).toBeUndefined();
    expect(readOptionalString(1)).toBeUndefined();
  });
});

describe("readOptionalList", () => {
  const allowed = ["free", "student"] as const;

  it("splits, filters unknown values, and dedupes", () => {
    expect(readOptionalList("free,paid,free,student", allowed)).toEqual([
      "free",
      "student",
    ]);
  });

  it("accepts an already parsed array", () => {
    expect(readOptionalList(["free", "nope"], allowed)).toEqual(["free"]);
  });

  it("returns undefined when nothing survives", () => {
    expect(readOptionalList("paid", allowed)).toBeUndefined();
    expect(readOptionalList(undefined, allowed)).toBeUndefined();
  });
});

describe("readOptionalOneOf", () => {
  it("accepts allowed ids only", () => {
    expect(readOptionalOneOf("ml", ["ml", "dev"])).toBe("ml");
    expect(readOptionalOneOf("nope", ["ml", "dev"])).toBeUndefined();
  });
});

describe("readOptionalQuery", () => {
  it("drops empty and blank queries", () => {
    expect(readOptionalQuery("latex")).toBe("latex");
    expect(readOptionalQuery("  ")).toBeUndefined();
    expect(readOptionalQuery("")).toBeUndefined();
  });
});
