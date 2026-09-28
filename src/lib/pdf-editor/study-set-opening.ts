import { buildEditorSearch } from "./editor-search";
import { readSetIds } from "./study-set-link";
import type {
  EditorSearch,
  EditorTreeNode,
  OpenFile,
  PaneLock,
  StudySet,
} from "./types";

/** What opening a set does: the tabs it opens, the URL it shows them at,
 * and the scroll lock to put back, keyed by the two files it joins. */
export interface StudySetOpening {
  files: OpenFile[];
  lock: PaneLock | null;
  search: EditorSearch;
}

function layOut(
  files: OpenFile[],
  primaryId: string | null,
  besideId: string | null,
  lockGap: number | null
): StudySetOpening | null {
  const primary = files.find((file) => file.id === primaryId) ?? files[0];
  if (!primary) {
    return null;
  }
  const beside =
    besideId && besideId !== primary.id && files.some((f) => f.id === besideId)
      ? besideId
      : undefined;
  return {
    files,
    lock:
      beside && lockGap !== null
        ? { files: `${primary.id}|${beside}`, gap: lockGap }
        : null,
    search: { ...buildEditorSearch(primary), beside },
  };
}

/** A set saved in this browser, laid out as it was saved. */
export function openSavedSet(set: StudySet): StudySetOpening | null {
  return layOut(set.files, set.primaryId, set.besideId, set.lockGap);
}

/** A shared link's files, those the index knows, the first in the first
 * pane and the one it names beside it. */
export function openSharedSet(
  nodes: EditorTreeNode[],
  set: string | undefined,
  beside: string | undefined
): StudySetOpening | null {
  const files = readSetIds(set).flatMap((id): OpenFile[] => {
    const node = nodes.find((item) => item.id === id && item.kind === "pdf");
    return node ? [{ id, name: node.name, source: "drive" }] : [];
  });
  return layOut(files, files[0]?.id ?? null, beside ?? null, null);
}
