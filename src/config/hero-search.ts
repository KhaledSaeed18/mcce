import type { DriveNodeKind } from "@/lib/drive/types";

/** The searches the panel cycles through. What each one finds is read from the
 * index at the time, so these are the only part anyone chooses. */
export const HERO_SEARCH_TERMS = ["midterm", "lecture", "lab"];

/** How many rows a search shows before the count stands in for the rest. */
export const HERO_SEARCH_ROW_COUNT = 4;

/** Borrowed from the chart ramp so the rows stay legible on both themes. */
export const HERO_SEARCH_KIND_COLOR: Partial<Record<DriveNodeKind, string>> = {
  doc: "chart-4",
  pdf: "chart-2",
  sheet: "chart-4",
  slides: "chart-3",
  video: "chart-5",
};

export const HERO_SEARCH_FALLBACK_COLOR = "chart-3";

export const HERO_TYPE_MS = 70;
export const HERO_CLEAR_MS = 32;
export const HERO_SETTLE_MS = 340;
export const HERO_FOCUS_MS = 780;
export const HERO_HOLD_MS = 2400;

export const HERO_ROW_STAGGER_SECONDS = 0.06;
export const HERO_ROW_DURATION_SECONDS = 0.28;
export const HERO_DIMMED_ROW_OPACITY = 0.5;
