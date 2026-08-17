import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DRIVE_SOURCES } from "../../src/config/sources";
import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";
import { getAccessToken } from "./auth";
import { type CrawledNode, crawlSource } from "./crawl";
import { stampFirstSeen } from "./diff";
import { getFileMetadata } from "./drive-client";
import { buildFeedXml } from "./feed";
import { buildSitemapXml } from "./sitemap";

const OUTPUT_PATH = resolve(process.cwd(), "src/data/drive-index.json");
const SITEMAP_PATH = resolve(process.cwd(), "public/sitemap.xml");
const FEED_PATH = resolve(process.cwd(), "public/feed.xml");

/** Missing on a first run and after a checkout without the artifact; both mean "nothing to diff". */
function readPreviousIndex(): DriveIndex | null {
  if (!existsSync(OUTPUT_PATH)) {
    return null;
  }
  return JSON.parse(readFileSync(OUTPUT_PATH, "utf8")) as DriveIndex;
}

function summarizeSource(
  sourceId: string,
  nodes: DriveNode[],
  description: string | null
) {
  const inSource = nodes.filter((node) => node.sourceId === sourceId);
  const fileCount = inSource.filter((node) => node.kind !== "folder").length;
  const folderCount = inSource.filter((node) => node.kind === "folder").length;
  const totalBytes = inSource.reduce(
    (sum, node) => sum + (node.sizeBytes ?? 0),
    0
  );

  return { description, fileCount, folderCount, id: sourceId, totalBytes };
}

async function main() {
  const accessToken = await getAccessToken();

  const perSource = await Promise.all(
    DRIVE_SOURCES.map(async (source) => {
      console.log(`Crawling ${source.label} (${source.rootFolderId})...`);
      const [nodes, metadata] = await Promise.all([
        crawlSource(source, accessToken),
        getFileMetadata(source.rootFolderId, accessToken),
      ]);
      console.log(`  -> ${source.label}: ${nodes.length} items`);
      return { description: metadata.description, nodes };
    })
  );
  const allNodes: CrawledNode[] = perSource.flatMap((result) => result.nodes);
  const descriptionBySourceId = new Map(
    perSource.map((result, i) => [DRIVE_SOURCES[i].id, result.description])
  );

  const generatedAt = new Date().toISOString();
  const previous = readPreviousIndex();
  const { baselineAt, nodes } = stampFirstSeen(allNodes, previous, generatedAt);
  const addedCount = nodes.filter(
    (node) => node.firstSeenAt === generatedAt
  ).length;

  const index: DriveIndex = {
    meta: {
      baselineAt,
      generatedAt,
      sources: DRIVE_SOURCES.map((source) =>
        summarizeSource(
          source.id,
          nodes,
          descriptionBySourceId.get(source.id) ?? null
        )
      ),
    },
    nodes,
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
  console.log(`Wrote ${nodes.length} nodes to ${OUTPUT_PATH}`);
  console.log(`  -> ${addedCount} not seen by the previous sync`);

  writeFileSync(SITEMAP_PATH, buildSitemapXml(index));
  console.log(`Wrote sitemap to ${SITEMAP_PATH}`);

  writeFileSync(FEED_PATH, buildFeedXml(index));
  console.log(`Wrote feed to ${FEED_PATH}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
