import {
  STATIC_PAGES,
  type StaticPage,
  TRACKS_INDEX,
  TRACKS_RESOURCES,
} from "../../src/config/seo/sitemap";
import { SITE_URL } from "../../src/config/site";
import { latestDate } from "../../src/lib/seo/latestDate";
import { buildUrlEntry } from "./sitemapXml";

function resolveLastmod(
  lastmod: StaticPage["lastmod"],
  indexDate: string,
  resourcesDate: string
): string {
  if (lastmod === TRACKS_INDEX) {
    return indexDate;
  }
  if (lastmod === TRACKS_RESOURCES) {
    return resourcesDate;
  }
  return lastmod;
}

export function buildStaticEntries(
  indexDate: string,
  resourcesDate: string
): string[] {
  return STATIC_PAGES.map((page) =>
    buildUrlEntry(
      `${SITE_URL}${page.path}`,
      latestDate(
        page.contentLastmod ?? "",
        resolveLastmod(page.lastmod, indexDate, resourcesDate)
      ),
      page.changefreq,
      page.priority
    )
  );
}
