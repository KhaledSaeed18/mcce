import type { DriveIndex } from "../../src/lib/drive/types";
import { buildCourseDateMap, getIndexDate } from "./sitemap-dates";
import { buildCourseEntries } from "./sitemapCourseEntries";
import {
  buildCategoryEntries,
  buildFolderEntries,
} from "./sitemapIndexEntries";
import { buildStaticEntries } from "./sitemapStaticEntries";

export function buildSitemapXml(
  index: DriveIndex,
  resourcesDate: string
): string {
  return `${[
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...buildStaticEntries(getIndexDate(index), resourcesDate),
    ...buildCategoryEntries(resourcesDate),
    ...buildCourseEntries(buildCourseDateMap(index.nodes)),
    ...buildFolderEntries(index.nodes),
    "</urlset>",
  ].join("\n")}\n`;
}
