import type { ParsedLocation } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { getRouter } from "./router";

describe("router scroll restoration", () => {
  it("enables scrollRestoration and uses pathname for cache key", () => {
    const router = getRouter();

    expect(router.options.scrollRestoration).toBe(true);
    expect(router.options.getScrollRestorationKey).toBeDefined();

    const mockLocation: ParsedLocation = {
      external: false,
      hash: "",
      href: "/exams?file=file-123",
      pathname: "/exams",
      publicHref: "/exams?file=file-123",
      search: { file: "file-123" },
      searchStr: "?file=file-123",
      state: {
        __TSR_index: 0,
      },
    };

    const key = router.options.getScrollRestorationKey?.(mockLocation);
    expect(key).toBe("/exams");
  });
});
