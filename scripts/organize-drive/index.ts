import { resolve } from "node:path";
import { DRIVE_SOURCES } from "../../src/config/sources";
import { DRIVE_WRITE_SCOPE, getAccessToken } from "../sync-drive/auth";
import { crawlSource } from "../sync-drive/crawl";
import { type ApplyContext, applyPlan } from "./apply";
import { moveFile, renameFile } from "./drive-write";
import { readJournal } from "./journal";
import {
  findCollisions,
  findUncategorised,
  planTree,
  type TreeNode,
} from "./plan";

const JOURNAL_PATH = resolve(
  process.cwd(),
  "scripts/organize-drive/journal.ndjson"
);

/** The sync crawler already walks these roots concurrently; this only reshapes its output. */
function toTreeNodes(
  nodes: Awaited<ReturnType<typeof crawlSource>>,
  rootFolderId: string
): TreeNode[] {
  return nodes.map((node) => ({
    id: node.id,
    isFolder: node.kind === "folder",
    name: node.name,
    parentId: node.parentId ?? rootFolderId,
    path: node.pathNames,
    sourceId: node.sourceId,
  }));
}

function printPlan(planned: ReturnType<typeof planTree>): void {
  for (const node of planned) {
    const from = node.path.join("/");
    const to = node.targetPath.join("/");
    if (from !== to) {
      console.log(`  - ${from}\n  + ${to}`);
    }
  }
}

async function rollback(accessToken: string): Promise<void> {
  const entries = readJournal(JOURNAL_PATH);
  console.log(`Reversing ${entries.length} journalled operations...`);

  for (const entry of [...entries].reverse()) {
    if (entry.kind === "rename") {
      // biome-ignore lint/performance/noAwaitInLoops: sequential undo keeps the journal position meaningful
      await renameFile(entry.fileId, entry.from, accessToken);
    } else if (entry.kind === "move") {
      await moveFile(entry.fileId, entry.to, entry.from, accessToken);
    }
    // Created folders are left behind: the service account has no delete right.
  }
  console.log(
    "Rolled back. Folders created by the run remain and must be removed by hand."
  );
}

async function main(): Promise<void> {
  const mode = process.argv[2] ?? "plan";
  const accessToken = await getAccessToken(DRIVE_WRITE_SCOPE);

  if (mode === "rollback") {
    await rollback(accessToken);
    return;
  }

  const crawled = await Promise.all(
    DRIVE_SOURCES.map(async (source) => {
      console.log(`Crawling ${source.label}...`);
      const nodes = await crawlSource(source, accessToken);
      return toTreeNodes(nodes, source.rootFolderId);
    })
  );
  const nodes = crawled.flat();

  const allPlanned = planTree(nodes);

  // Every folder that already exists is registered under the path it will end
  // up at, including the ones that do not move. Seeding only the changed ones
  // would make each untouched folder look absent and get created a second time.
  const folderIds = new Map<string, string>(
    allPlanned
      .filter((node) => node.isFolder)
      .map((node) => [node.targetPath.join("/"), node.id])
  );

  const planned = allPlanned.filter(
    (node) => node.path.join("/") !== node.targetPath.join("/")
  );
  const collisions = findCollisions(allPlanned);
  if (collisions.length > 0) {
    console.error("Refusing to run, these targets collide:");
    console.error(JSON.stringify(collisions, null, 2));
    process.exitCode = 1;
    return;
  }

  const uncategorised = findUncategorised(allPlanned);
  if (uncategorised.length > 0) {
    console.warn("\nCourse folders outside the canonical set:");
    for (const path of uncategorised) {
      console.warn(`  ${path}`);
    }
  }

  const dryRun = mode !== "apply";
  if (dryRun) {
    printPlan(planned);
  }

  const context: ApplyContext = {
    accessToken,
    dryRun,
    folderIds,
    journalPath: JOURNAL_PATH,
  };
  const stats = await applyPlan(planned, context);

  console.log(
    `\n${planned.length} paths change: create ${stats.created}, move ${stats.moved}, rename ${stats.renamed}.`
  );
  if (dryRun) {
    console.log("Dry run. Pass 'apply' to write these to Drive.");
    return;
  }
  console.log(`Journal written to ${JOURNAL_PATH}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
