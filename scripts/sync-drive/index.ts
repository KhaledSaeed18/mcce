import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DRIVE_SOURCES } from "../../src/config/sources";
import type { DriveIndex, DriveNode } from "../../src/lib/drive/types";
import { getAccessToken } from "./auth";
import { crawlSource } from "./crawl";
import { getFileMetadata } from "./drive-client";

const OUTPUT_PATH = resolve(process.cwd(), "src/data/drive-index.json");

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
  const allNodes: DriveNode[] = perSource.flatMap((result) => result.nodes);
  const descriptionBySourceId = new Map(
    perSource.map((result, i) => [DRIVE_SOURCES[i].id, result.description])
  );

  const index: DriveIndex = {
    meta: {
      generatedAt: new Date().toISOString(),
      sources: DRIVE_SOURCES.map((source) =>
        summarizeSource(
          source.id,
          allNodes,
          descriptionBySourceId.get(source.id) ?? null
        )
      ),
    },
    nodes: allNodes,
  };

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 2));
  console.log(`Wrote ${allNodes.length} nodes to ${OUTPUT_PATH}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
