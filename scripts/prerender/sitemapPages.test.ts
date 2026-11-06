import { describe, expect, it } from "vitest";
import { readSitemapPages } from "./sitemapPages";

describe("readSitemapPages", () => {
  it("returns the path of every location, keeping the root", () => {
    const xml = `<urlset>
      <url><loc>https://example.com/</loc></url>
      <url><loc>https://example.com/course/ENGG515</loc><lastmod>2026-10-26</lastmod></url>
    </urlset>`;

    expect(readSitemapPages(xml)).toEqual([
      { path: "/" },
      { path: "/course/ENGG515" },
    ]);
  });
});
