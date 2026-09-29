import { writeClipLink } from "./clips/clip-link";
import type { EditorSearch, StudySet } from "./types";

/** A study set as a link another reader can open: the index files in it,
 * which sits beside which, and its clips. Files from this device are left
 * out, since they are only in this browser. */
export function buildStudySetSearch(set: StudySet): {
  leftOut: number;
  search: EditorSearch;
} {
  const shared = set.files.filter((file) => file.source === "drive");
  const ids = shared.map((file) => file.id);
  const primary = ids.includes(set.primaryId ?? "") ? set.primaryId : ids[0];
  const ordered = primary
    ? [primary, ...ids.filter((id) => id !== primary)]
    : ids;
  const beside =
    set.besideId && ids.includes(set.besideId) && set.besideId !== primary
      ? set.besideId
      : undefined;
  return {
    leftOut: set.files.length - shared.length,
    search: { beside, clips: writeClipLink(set.clips), set: ordered.join(",") },
  };
}

/** The ids a shared link names, the first of them for the first pane. */
export function readSetIds(value: string | undefined): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}
