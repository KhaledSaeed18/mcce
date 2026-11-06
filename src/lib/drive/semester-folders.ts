import type { DriveNode, SemesterFolder } from "./types";
import { buildDriveFolderUrl } from "./urls";

const SEMESTER_FOLDER_NAME = /^(First|Second) Year \| (Fall|Spring) Semester$/u;
const YEAR_BY_WORD: Record<string, SemesterFolder["year"]> = {
  First: 1,
  Second: 2,
};

const TERM_ORDER: Record<SemesterFolder["term"], number> = {
  Fall: 0,
  Spring: 1,
};

function compareSemesterFolders(a: SemesterFolder, b: SemesterFolder): number {
  return a.year - b.year || TERM_ORDER[a.term] - TERM_ORDER[b.term];
}

function summarizeSemester(
  folder: DriveNode,
  nodes: DriveNode[]
): Pick<SemesterFolder, "courses" | "fileCount"> {
  const namesByCode = new Map<string, string>();
  let fileCount = 0;

  for (const node of nodes) {
    if (node.semester !== folder.name) {
      continue;
    }
    if (node.courseCode && node.courseName) {
      namesByCode.set(node.courseCode, node.courseName);
    }
    if (node.kind !== "folder") {
      fileCount += 1;
    }
  }

  const courses = [...namesByCode]
    .map(([code, name]) => ({ code, name }))
    .sort((a, b) => a.code.localeCompare(b.code));

  return { courses, fileCount };
}

export function formatSemesterFolderLabel({
  term,
  year,
}: Pick<SemesterFolder, "term" | "year">): string {
  return `Year ${year}, ${term} semester`;
}

/** Read from the synced index, so a moved folder updates the links with the next sync. */
export function buildSemesterFolders(nodes: DriveNode[]): SemesterFolder[] {
  const folders: SemesterFolder[] = [];

  for (const node of nodes) {
    const match =
      node.depth === 0 && node.kind === "folder"
        ? SEMESTER_FOLDER_NAME.exec(node.name)
        : null;
    const year = match ? YEAR_BY_WORD[match[1]] : undefined;
    if (!(match && year)) {
      continue;
    }

    folders.push({
      ...summarizeSemester(node, nodes),
      href: buildDriveFolderUrl(node.id),
      id: node.id,
      term: match[2] as SemesterFolder["term"],
      year,
    });
  }

  return folders.sort(compareSemesterFolders);
}
