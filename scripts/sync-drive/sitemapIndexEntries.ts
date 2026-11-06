import { RESOURCE_CATEGORIES } from "../../src/config/resources/categories";
import {
  RESOURCES_PAGE_PATH,
  RESOURCES_STUDENT_PATH,
} from "../../src/config/resources/copy";
import { STUDENT_PERKS } from "../../src/config/resources/student-perks";
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

export function buildStudentPerkEntries(resourcesDate: string): string[] {
  const paths = [
    RESOURCES_STUDENT_PATH,
    ...STUDENT_PERKS.map((perk) => `${RESOURCES_STUDENT_PATH}/${perk.id}`),
  ];

  return paths.map((path) =>
    buildUrlEntry(`${SITE_URL}${path}`, resourcesDate, "monthly", "0.6")
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
