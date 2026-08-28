import type { HeroSearchQuery } from "@/components/marketing/types";
import type { DriveNodeKind } from "@/lib/drive/types";

/** Every row below is a real file in the indexed Drive, and every total is the
 * number of indexed files whose own name carries that term. The panel is
 * decorative, but it should not advertise material the program does not
 * actually have, so `hero-search.test.ts` holds both claims against the index
 * a Drive sync last wrote. */
export const HERO_SEARCH_QUERIES: HeroSearchQuery[] = [
  {
    results: [
      {
        courseCode: "EENG537",
        kind: "pdf",
        materialType: "exam",
        name: "(2020-2021)Midterm.pdf",
      },
      {
        courseCode: "CENG566",
        kind: "pdf",
        materialType: "exam",
        name: "CENG566-(2021)Midterm.pdf",
      },
      {
        courseCode: "CENG507",
        kind: "pdf",
        materialType: "exam",
        name: "(2020-2021)Midterm.pdf",
      },
      {
        courseCode: "ENGG515",
        kind: "pdf",
        materialType: "exam",
        name: "[Solution](2020-2021)V1-Midterm+Final.pdf",
      },
    ],
    term: "midterm",
    total: 49,
  },
  {
    results: [
      {
        courseCode: "CENG675",
        kind: "pdf",
        materialType: "lecture",
        name: "Lecture3.pdf",
      },
      {
        courseCode: "CENG566L",
        kind: "video",
        materialType: "lecture",
        name: "Lecture1.mp4",
      },
      {
        courseCode: "CENG566L",
        kind: "slides",
        materialType: "lab",
        name: "Lecture6-RadialBasisFunctionNetworks.pptx",
      },
      {
        courseCode: "CENG675",
        kind: "video",
        materialType: "lecture",
        name: "[V1]Lecture1-P1.mp4",
      },
    ],
    term: "lecture",
    total: 164,
  },
  {
    results: [
      {
        courseCode: "CENG566L",
        kind: "pdf",
        materialType: "lab",
        name: "LAB1.pdf",
      },
      {
        courseCode: "CENG566L",
        kind: "pdf",
        materialType: "lab",
        name: "LAB2.pdf",
      },
      {
        courseCode: "EENG537",
        kind: "pdf",
        materialType: "lecture",
        name: "introduction-to-matlab.pdf",
      },
      {
        courseCode: "CENG566L",
        kind: "pdf",
        materialType: "lab",
        name: "LAB6.pdf",
      },
    ],
    term: "lab",
    total: 9,
  },
];

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
