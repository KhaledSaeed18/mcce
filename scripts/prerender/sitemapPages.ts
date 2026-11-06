import { readFileSync } from "node:fs";

const LOC_PATTERN = /<loc>([^<]+)<\/loc>/gu;

/** The sitemap already lists every indexable page, so it decides what gets prerendered. */
export function readSitemapPages(sitemapXml: string): { path: string }[] {
  return [...sitemapXml.matchAll(LOC_PATTERN)].map(([, loc]) => ({
    path: new URL(loc).pathname,
  }));
}

export function loadSitemapPages(sitemapPath: string): { path: string }[] {
  return readSitemapPages(readFileSync(sitemapPath, "utf8"));
}
