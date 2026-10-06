import { isNotFound, isRedirect } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { CURRICULUM } from "@/config/curriculum";
import { buildCourseContextLookup } from "./lookup";
import { resolveCourseRoute } from "./resolveCourseRoute";

const LOOKUP = buildCourseContextLookup(CURRICULUM);

describe("resolveCourseRoute", () => {
  it("accepts a canonical curriculum code", () => {
    expect(() => resolveCourseRoute(LOOKUP, "ENGG515", {})).not.toThrow();
  });

  it.each(["engg515", "EnGg515", "ceng566l", "ceng695a"])(
    "redirects %s permanently and preserves preview parameters",
    (code) => {
      expect.assertions(2);
      try {
        resolveCourseRoute(LOOKUP, code, { file: "file-123" });
      } catch (error) {
        expect(isRedirect(error)).toBe(true);
        if (!isRedirect(error)) {
          return;
        }
        expect(error.options).toMatchObject({
          statusCode: 301,
          params: { code: code.toUpperCase() },
          search: { file: "file-123" },
        });
      }
    }
  );

  it.each(["CENG999", "ceng999", "unknown"])(
    "rejects %s as missing",
    (code) => {
      expect.assertions(2);
      try {
        resolveCourseRoute(LOOKUP, code, {});
      } catch (error) {
        expect(isNotFound(error)).toBe(true);
        expect(error).toMatchObject({ routeId: "/course/$code" });
      }
    }
  );
});
