import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";
import type { ResourcesIndex } from "../../src/lib/resources/types";
import { latestDate } from "../../src/lib/seo/latestDate";

/** Drive stamps every node in the same RFC 3339 UTC shape, so plain string
 * comparison orders them correctly without parsing a Date. */
function getNodeDate(node: DriveNode): string {
  return latestDate(node.modifiedTime, node.firstSeenAt);
}

function toIsoDate(timestamp: string): string {
  return timestamp.slice(0, 10);
}

/**
 * Adding an older file changes the page when it is first indexed, even if
 * its Drive modification time predates the site's baseline.
 */
export function getIndexDate(index: DriveIndex): string {
  let newest = index.meta.baselineAt;

  for (const node of index.nodes) {
    newest = latestDate(newest, getNodeDate(node));
  }

  return toIsoDate(newest);
}

/** Newest modification date per course code, for the courses that have material. */
export function buildCourseDateMap(nodes: DriveNode[]): Map<string, string> {
  const byCode = new Map<string, string>();

  for (const node of nodes) {
    if (!node.courseCode) {
      continue;
    }

    const current = byCode.get(node.courseCode);
    byCode.set(node.courseCode, latestDate(current ?? "", getNodeDate(node)));
  }

  return new Map(
    [...byCode].map(([code, timestamp]) => [code, toIsoDate(timestamp)])
  );
}

/** The day the resource catalog was last rebuilt, which is when its pages changed. */
export function getResourcesDate(index: Pick<ResourcesIndex, "meta">): string {
  return toIsoDate(index.meta.generatedAt);
}
