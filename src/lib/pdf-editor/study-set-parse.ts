import { parseClips } from "./clips/clip-desk-parse";
import { isOpenFile } from "./open-file-parse";
import type { StudySet } from "./types";

function readId(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseSet(value: unknown): StudySet | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const stored = value as Record<string, unknown>;
  const files = Array.isArray(stored.files)
    ? stored.files.filter(isOpenFile)
    : [];
  if (
    typeof stored.id !== "string" ||
    typeof stored.name !== "string" ||
    files.length === 0
  ) {
    return null;
  }
  return {
    besideId: readId(stored.besideId),
    // Sets saved before clips existed have none.
    clips: parseClips(stored.clips),
    files,
    id: stored.id,
    lockGap: typeof stored.lockGap === "number" ? stored.lockGap : null,
    name: stored.name,
    primaryId: readId(stored.primaryId),
    savedAt: typeof stored.savedAt === "string" ? stored.savedAt : "",
  };
}

/** Whatever was stored comes back as sets the editor can trust, dropping
 * any that do not fit and any left without files. */
export function parseStudySets(value: unknown): StudySet[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    const set = parseSet(item);
    return set ? [set] : [];
  });
}
