import { isNotFound, isRedirect } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/config/curriculum";
import { buildCourseContextLookup } from "./lookup";
import { resolveCourseRoute } from "./resolveCourseRoute";

const LOOKUP = buildCourseContextLookup(CURRICULUM);

function thrownBy(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }
  throw new Error("Expected the action to throw");
}

describe("resolveCourseRoute", () => {
  it("accepts a canonical curriculum code", () => {
    expect(() => resolveCourseRoute(LOOKUP, "ENGG515", {})).not.toThrow();
  });

  it.each(["engg515", "EnGg515", "ceng566l", "ceng695a"])(
    "redirects %s permanently and preserves preview parameters",
    (code) => {
      const error = thrownBy(() =>
        resolveCourseRoute(LOOKUP, code, { file: "file-123" })
      );

      expect(isRedirect(error)).toBe(true);
      expect(error).toMatchObject({
        options: {
          statusCode: 301,
          params: { code: code.toUpperCase() },
          search: { file: "file-123" },
        },
      });
    }
  );

  it.each(["CENG999", "ceng999", "unknown"])(
    "rejects %s as missing",
    (code) => {
      const error = thrownBy(() => resolveCourseRoute(LOOKUP, code, {}));

      expect(isNotFound(error)).toBe(true);
      expect(error).toMatchObject({ routeId: "/course/$code" });
    }
  );
});
