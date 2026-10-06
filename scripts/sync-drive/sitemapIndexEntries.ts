import { RESOURCE_CATEGORIES } from "../../src/config/resources/categories";
import { RESOURCES_PAGE_PATH } from "../../src/config/resources/copy";
import { SITE_URL } from "../../src/config/site";
import type { DriveNode } from "../../src/lib/drive/types";
import { findFolderCourseCode } from "../../src/lib/seo/folder-canonical";
import { buildUrlEntry } from "./sitemapXml";

export function buildCategoryEntries(resourcesDate: string): string[] {
  return RESOURCE_CATEGORIES.map((category) =>
    buildUrlEntry(
      `${SITE_URL}${RESOURCES_PAGE_PATH}/${category.id}`,
      resourcesDate,
      "monthly",
      "0.6"
    )
  );
}

export function buildFolderEntries(nodes: DriveNode[]): string[] {
  return nodes
    .filter(
      (node) =>
        node.kind === "folder" &&
        node.depth === 1 &&
        findFolderCourseCode(node) === null
    )
    .map((node) =>
      buildUrlEntry(
        `${SITE_URL}/browse/${node.id}`,
        node.modifiedTime.slice(0, 10),
        "weekly",
        "0.7"
      )
    );
}
