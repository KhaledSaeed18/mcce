import { normaliseFolderName } from "./folder-name";
import {
  ASSESSMENT_FILE_MOVES,
  ASSESSMENT_FILE_PATTERN,
  COURSE_CATEGORIES,
  COURSE_REWRITES,
  FILE_RENAMES,
  type PrefixRewrite,
} from "./layout";
import { normaliseFileName } from "./naming";

export interface TreeNode {
  id: string;
  isFolder: boolean;
  name: string;
  parentId: string;
  path: string[];
  sourceId: string;
}

export interface PlannedNode extends TreeNode {
  targetPath: string[];
}

function startsWith(path: string[], prefix: string[]): boolean {
  return (
    path.length >= prefix.length &&
    prefix.every((segment, i) => path[i] === segment)
  );
}

function applyRewrite(path: string[], rule: PrefixRewrite): string[] {
  return startsWith(path, rule.from)
    ? [...rule.to, ...path.slice(rule.from.length)]
    : path;
}

/** Rules are chained in order, so a later rule sees what earlier ones produced. */
function applyCourseRewrites(path: string[]): string[] {
  return COURSE_REWRITES.reduce(applyRewrite, path);
}

function applyAssessmentMoves(path: string[], isFolder: boolean): string[] {
  if (isFolder || !ASSESSMENT_FILE_PATTERN.test(path.at(-1) ?? "")) {
    return path;
  }

  for (const { course, from } of ASSESSMENT_FILE_MOVES) {
    const prefix = [...course, ...from];
    if (startsWith(path, prefix) && path.length === prefix.length + 1) {
      return [...course, "Assessments", path.at(-1) as string];
    }
  }

  return path;
}

/** Course and semester folders keep their names; only what sits under them is normalised. */
const COURSE_DEPTH = 2;

function normaliseSegments(path: string[], isFolder: boolean): string[] {
  return path.map((segment, i) => {
    if (i < COURSE_DEPTH) {
      return segment;
    }
    const isLeafFile = !isFolder && i === path.length - 1;
    return isLeafFile
      ? normaliseFileName(segment)
      : normaliseFolderName(segment);
  });
}

function applyExplicitRename(node: TreeNode, path: string[]): string[] {
  const override = FILE_RENAMES[node.path.join("/")];
  return override ? [...path.slice(0, -1), override] : path;
}

export function planNode(node: TreeNode): PlannedNode {
  const rewritten = applyAssessmentMoves(
    applyCourseRewrites(node.path),
    node.isFolder
  );
  const normalised = normaliseSegments(rewritten, node.isFolder);
  return { ...node, targetPath: applyExplicitRename(node, normalised) };
}

export interface Collision {
  sources: string[];
  target: string;
}

/** Two nodes normalising onto one path would silently shadow a file, so apply refuses to run. */
export function findCollisions(planned: PlannedNode[]): Collision[] {
  const byTarget = new Map<string, string[]>();
  for (const node of planned) {
    const target = node.targetPath.join("/");
    byTarget.set(target, [
      ...(byTarget.get(target) ?? []),
      node.path.join("/"),
    ]);
  }

  return [...byTarget.entries()]
    .filter(([, sources]) => sources.length > 1)
    .map(([target, sources]) => ({ sources, target }));
}

export function planTree(nodes: TreeNode[]): PlannedNode[] {
  return nodes.map(planNode);
}

/** semester / course / category */
const CATEGORY_PATH_LENGTH = 3;

/**
 * Course-level folders outside the canonical vocabulary. A folder emptied by a
 * merge shows up here, because Drive gives the service account no right to
 * delete it and only the owner can clear it.
 */
export function findUncategorised(planned: PlannedNode[]): string[] {
  const canonical = new Set<string>(COURSE_CATEGORIES);
  return planned
    .filter(
      (node) =>
        node.isFolder &&
        node.targetPath.length === CATEGORY_PATH_LENGTH &&
        !canonical.has(node.targetPath.at(-1) as string)
    )
    .map((node) => node.targetPath.join("/"));
}
