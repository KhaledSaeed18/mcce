import { describe, expect, it } from "vitest";
import { SITE_URL } from "../../src/config/site";
import { makeNode } from "../../src/lib/drive/test-fixtures";
import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";
import { buildSitemapXml } from "./sitemap";
import { buildCourseDateMap, getIndexDate } from "./sitemap-dates";

const BASELINE = "2026-08-01T00:00:00.000Z";
const URL_ENTRY = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function makeIndex(nodes: DriveNode[], generatedAt: string): DriveIndex {
  return {
    meta: { baselineAt: BASELINE, generatedAt, sources: [] },
    nodes,
  };
}

function lastmods(xml: string): Map<string, string> {
  const entries = new Map<string, string>();

  for (const match of xml.matchAll(URL_ENTRY)) {
    entries.set(match[1].replace(SITE_URL, ""), match[2]);
  }

  return entries;
}

function lastmodFor(xml: string, path: string): string | undefined {
  return lastmods(xml).get(path);
}

describe("getIndexDate", () => {
  it("takes the newest node, not the run timestamp", () => {
    const index = makeIndex(
      [
        makeNode({ id: "a", modifiedTime: "2026-08-11T00:00:00.000Z" }),
        makeNode({ id: "b", modifiedTime: "2026-08-19T09:39:23.412Z" }),
      ],
      "2026-08-24T06:43:16.162Z"
    );

    expect(getIndexDate(index)).toBe("2026-08-19");
  });

  it("falls back to the baseline when the index holds no nodes", () => {
    expect(getIndexDate(makeIndex([], "2026-08-24T00:00:00.000Z"))).toBe(
      "2026-08-01"
    );
  });
});

describe("buildCourseDateMap", () => {
  it("keeps the newest file per course and ignores uncoded nodes", () => {
    const dates = buildCourseDateMap([
      makeNode({
        courseCode: "CENG557",
        id: "a",
        modifiedTime: "2026-08-11T00:00:00.000Z",
      }),
      makeNode({
        courseCode: "CENG557",
        id: "b",
        modifiedTime: "2026-08-18T00:00:00.000Z",
      }),
      makeNode({
        courseCode: "EENG537",
        id: "c",
        modifiedTime: "2026-08-02T00:00:00.000Z",
      }),
      makeNode({ id: "loose", modifiedTime: "2026-08-24T00:00:00.000Z" }),
    ]);

    expect(dates.get("CENG557")).toBe("2026-08-18");
    expect(dates.get("EENG537")).toBe("2026-08-02");
    expect(dates.size).toBe(2);
  });
});

describe("buildSitemapXml", () => {
  const nodes = [
    makeNode({
      courseCode: "CENG557",
      depth: 1,
      id: "course-a",
      kind: "folder",
      modifiedTime: "2026-08-18T00:00:00.000Z",
    }),
  ];

  it("ignores the run timestamp, so an unchanged index rewrites the same file", () => {
    const first = buildSitemapXml(makeIndex(nodes, "2026-08-17T06:41:16.505Z"));
    const second = buildSitemapXml(
      makeIndex(nodes, "2026-08-24T06:43:16.162Z")
    );

    expect(second).toBe(first);
  });

  it("dates the Drive-driven pages from the newest indexed file", () => {
    const xml = buildSitemapXml(makeIndex(nodes, "2026-08-24T06:43:16.162Z"));

    expect(lastmodFor(xml, "/")).toBe("2026-08-18");
    expect(lastmodFor(xml, "/recent")).toBe("2026-08-18");
  });

  it("dates a hand-written page from its own entry, not the index", () => {
    const xml = buildSitemapXml(makeIndex(nodes, "2026-08-24T06:43:16.162Z"));

    expect(lastmodFor(xml, "/legal")).toBe("2026-08-18");
    expect(lastmodFor(xml, "/cce")).toBe("2026-08-24");
  });

  it("dates a course page from its own material", () => {
    const xml = buildSitemapXml(makeIndex(nodes, "2026-08-24T06:43:16.162Z"));

    expect(lastmodFor(xml, "/course/CENG557")).toBe("2026-08-18");
  });

  // Pages added to the committed XML by hand were dropped by the next sync,
  // because the generator rebuilds the whole file from STATIC_PAGES.
  it.each([
    "/",
    "/search",
    "/course",
    "/exams",
    "/recent",
    "/plan-of-study",
    "/cce",
    "/admissions",
    "/tuition-fees",
    "/gpa-calculator",
    "/about",
    "/faq",
    "/contact",
    "/sitemap",
    "/legal",
  ])("lists %s", (path) => {
    const xml = buildSitemapXml(makeIndex(nodes, "2026-08-24T06:43:16.162Z"));

    expect(lastmodFor(xml, path)).toMatch(ISO_DATE);
  });
});
