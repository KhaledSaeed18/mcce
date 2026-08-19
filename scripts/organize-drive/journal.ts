import { appendFileSync, existsSync, readFileSync } from "node:fs";

export type JournalEntry =
  | { fileId: string; from: string; kind: "rename"; to: string }
  | { fileId: string; from: string; kind: "move"; to: string }
  | { fileId: string; kind: "create"; parentId: string; name: string };

/**
 * Appended before each call returns, so an interrupted run still leaves a
 * complete record of what already changed. Drive gives the service account no
 * delete right, which makes replaying the journal backwards the only undo.
 */
export function record(path: string, entry: JournalEntry): void {
  appendFileSync(path, `${JSON.stringify(entry)}\n`);
}

export function readJournal(path: string): JournalEntry[] {
  if (!existsSync(path)) {
    return [];
  }
  return readFileSync(path, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as JournalEntry);
}
