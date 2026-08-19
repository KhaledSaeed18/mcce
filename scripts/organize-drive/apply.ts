import { createFolder, moveFile, renameFile } from "./drive-write";
import { type JournalEntry, record } from "./journal";
import type { PlannedNode } from "./plan";

export interface ApplyContext {
  accessToken: string;
  dryRun: boolean;
  /** Target path (joined) to the folder id that now holds it. */
  folderIds: Map<string, string>;
  journalPath: string;
}

export interface ApplyStats {
  created: number;
  moved: number;
  renamed: number;
}

function log(context: ApplyContext, entry: JournalEntry): void {
  if (!context.dryRun) {
    record(context.journalPath, entry);
  }
}

/** Walks down the target path, creating whatever does not exist yet. */
async function resolveParentId(
  segments: string[],
  context: ApplyContext,
  stats: ApplyStats
): Promise<string> {
  let parentId = context.folderIds.get(segments[0]) as string;

  for (let i = 1; i < segments.length; i += 1) {
    const key = segments.slice(0, i + 1).join("/");
    const known = context.folderIds.get(key);
    if (known) {
      parentId = known;
      continue;
    }

    const name = segments[i];
    const created = context.dryRun
      ? `dry-run:${key}`
      : // biome-ignore lint/performance/noAwaitInLoops: each level needs the id of the one above it
        await createFolder(name, parentId, context.accessToken);
    log(context, { fileId: created, kind: "create", name, parentId });
    context.folderIds.set(key, created);
    stats.created += 1;
    parentId = created;
  }

  return parentId;
}

async function applyNode(
  node: PlannedNode,
  context: ApplyContext,
  stats: ApplyStats
): Promise<void> {
  const targetParent = node.targetPath.slice(0, -1);
  const parentId = await resolveParentId(targetParent, context, stats);
  const targetName = node.targetPath.at(-1) as string;

  if (parentId !== node.parentId) {
    if (!context.dryRun) {
      await moveFile(node.id, node.parentId, parentId, context.accessToken);
    }
    log(context, {
      fileId: node.id,
      from: node.parentId,
      kind: "move",
      to: parentId,
    });
    stats.moved += 1;
  }

  if (targetName !== node.name) {
    if (!context.dryRun) {
      await renameFile(node.id, targetName, context.accessToken);
    }
    log(context, {
      fileId: node.id,
      from: node.name,
      kind: "rename",
      to: targetName,
    });
    stats.renamed += 1;
  }

  if (node.isFolder) {
    context.folderIds.set(node.targetPath.join("/"), node.id);
  }
}

/**
 * Shallowest target first, so a folder is in place before anything is filed
 * into it. Every operation addresses a node by id, so the order of siblings
 * never matters.
 */
export async function applyPlan(
  planned: PlannedNode[],
  context: ApplyContext
): Promise<ApplyStats> {
  const stats: ApplyStats = { created: 0, moved: 0, renamed: 0 };
  const ordered = [...planned].sort(
    (a, b) =>
      Number(b.isFolder) - Number(a.isFolder) ||
      a.targetPath.length - b.targetPath.length
  );

  for (const node of ordered) {
    // biome-ignore lint/performance/noAwaitInLoops: parents must exist before children are filed
    await applyNode(node, context, stats);
  }

  return stats;
}
