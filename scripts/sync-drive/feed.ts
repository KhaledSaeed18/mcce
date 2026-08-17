import { SITE_URL } from "../../src/config/site";
import { buildRecentBatches } from "../../src/lib/drive/recent";
import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";

const FEED_ITEM_LIMIT = 50;
const FEED_URL = `${SITE_URL}/feed.xml`;

const XML_ESCAPES: Record<string, string> = {
  "'": "&apos;",
  '"': "&quot;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};
const XML_UNSAFE = /["&'<>]/g;

function escapeXml(value: string): string {
  return value.replace(XML_UNSAFE, (character) => XML_ESCAPES[character]);
}

/** Deep link into the site rather than into Drive, so the file arrives in context. */
function itemLink(node: DriveNode): string {
  return node.parentId
    ? `${SITE_URL}/browse/${node.parentId}?file=${node.id}`
    : `${SITE_URL}/recent`;
}

function buildItem(node: DriveNode, addedAt: string): string {
  const course = node.courseCode ? `${node.courseCode}: ` : "";
  return [
    "    <item>",
    `      <title>${escapeXml(course + node.name)}</title>`,
    `      <link>${escapeXml(itemLink(node))}</link>`,
    `      <guid isPermaLink="false">${node.id}</guid>`,
    `      <pubDate>${new Date(addedAt).toUTCString()}</pubDate>`,
    "    </item>",
  ].join("\n");
}

/** One entry per file added since the index started tracking additions, newest first. */
export function buildFeedXml(index: DriveIndex): string {
  const items = buildRecentBatches(index)
    .flatMap((batch) =>
      batch.courses.flatMap((course) =>
        course.items.map((node) => buildItem(node, batch.addedAt))
      )
    )
    .slice(0, FEED_ITEM_LIMIT);

  return `${[
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>MCCE: recently added</title>",
    `    <link>${SITE_URL}/recent</link>`,
    "    <description>Material added to the MCCE index, updated weekly.</description>",
    `    <lastBuildDate>${new Date(index.meta.generatedAt).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
  ].join("\n")}\n`;
}
