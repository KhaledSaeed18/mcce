import { useCallback } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { addStudySet } from "@/lib/pdf-editor/study-sets";
import type { OpenFile } from "@/lib/pdf-editor/types";

interface StudySetSaverOptions {
  files: OpenFile[];
  lockGap: number | null;
  panes: EditorPaneView[];
}

function buildSetId(): string {
  return `set-${crypto.randomUUID()}`;
}

/** Saves the open tabs as a study set under a name, with the file in each
 * pane and the scroll lock between them. */
export function useStudySetSaver({
  files,
  lockGap,
  panes,
}: StudySetSaverOptions) {
  const [primary, beside] = panes;

  return useCallback(
    (name: string) =>
      addStudySet({
        besideId: beside?.node?.id ?? null,
        files,
        id: buildSetId(),
        lockGap: beside ? lockGap : null,
        name,
        primaryId: primary.node?.id ?? null,
        savedAt: new Date().toISOString(),
      }),
    [beside, files, lockGap, primary]
  );
}
