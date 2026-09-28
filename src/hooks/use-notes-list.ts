import { useMemo } from "react";
import { useRevisionSummary } from "@/hooks/use-revision-summary";
import {
  collectStudyItems,
  groupStudyItems,
} from "@/lib/pdf-editor/study-items";
import type { Annotation, EditorPage } from "@/lib/pdf-editor/types";

/** The file's notes and highlights by page, and the summary made of them. */
export function useNotesList(
  annotations: Annotation[],
  pages: EditorPage[],
  fileName: string
) {
  const groups = useMemo(
    () => groupStudyItems(collectStudyItems(annotations, pages)),
    [annotations, pages]
  );
  const summary = useRevisionSummary(fileName, groups);
  return { groups, summary };
}
