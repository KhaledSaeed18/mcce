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

  it("preserves hash in scroll restoration key when hash is present", () => {
    const router = getRouter();

    const mockLocationWithHash: ParsedLocation = {
      external: false,
      hash: "ENGG550",
      href: "/exams#ENGG550",
      pathname: "/exams",
      publicHref: "/exams#ENGG550",
      search: {},
      searchStr: "",
      state: {
        __TSR_index: 0,
      },
    };

    const key = router.options.getScrollRestorationKey?.(mockLocationWithHash);
    expect(key).toBe("/exams#ENGG550");
  });
});

describe("router pending configuration", () => {
  it("shows pending component immediately with no suppression window", () => {
    const router = getRouter();
    expect(router.options.defaultPendingMs).toBe(0);
  });

  it("keeps pending component visible long enough to avoid a flash", () => {
    const router = getRouter();
    expect(router.options.defaultPendingMinMs).toBe(300);
  });
});
