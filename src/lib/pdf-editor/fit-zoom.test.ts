import { describe, expect, it } from "vitest";
import { MAX_ZOOM, MIN_ZOOM, PAGE_FIT_PADDING } from "@/config/pdf-editor";
import { clampZoom, getFitZoom } from "./fit-zoom";
import type { PageSize } from "./types";

const PAGE: PageSize = { height: 800, width: 600 };

function viewport(width: number, height: number): PageSize {
  return { height, width };
}

describe("clampZoom", () => {
  it("keeps a zoom the reader can come back from", () => {
    expect(clampZoom(0.01)).toBe(MIN_ZOOM);
    expect(clampZoom(99)).toBe(MAX_ZOOM);
    expect(clampZoom(1.5)).toBe(1.5);
  });
});

describe("getFitZoom", () => {
  it("fits the width and lets the length scroll", () => {
    const width = 600 + PAGE_FIT_PADDING;

    expect(getFitZoom("fit-width", PAGE, viewport(width, 200))).toBe(1);
  });

  it("fits the page to whichever axis runs out first", () => {
    const wide = viewport(1200 + PAGE_FIT_PADDING, 400 + PAGE_FIT_PADDING);

    expect(getFitZoom("fit-page", PAGE, wide)).toBe(0.5);
  });

  it("fits to the width when that is the tighter axis", () => {
    const tall = viewport(300 + PAGE_FIT_PADDING, 1600 + PAGE_FIT_PADDING);

    expect(getFitZoom("fit-page", PAGE, tall)).toBe(0.5);
  });

  it("will not fit a page smaller than the zoom range allows", () => {
    expect(getFitZoom("fit-width", PAGE, viewport(60, 60))).toBe(MIN_ZOOM);
  });
});
