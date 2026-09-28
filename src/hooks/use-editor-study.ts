import { useCallback } from "react";
import { useCoverReveal } from "@/hooks/use-cover-reveal";
import { useExamTimer } from "@/hooks/use-exam-timer";
import { usePageBookmarks } from "@/hooks/use-page-bookmarks";
import type {
  Annotation,
  EditorPage,
  EditorTool,
} from "@/lib/pdf-editor/types";

interface EditorStudyOptions {
  activeIndex: number;
  annotations: Annotation[];
  fileId: string | undefined;
  onToolChange: (tool: EditorTool) => void;
  pages: EditorPage[];
}

/** What the editor keeps for studying a file rather than marking it up: the
 * answers the reader has looked under, the pages they bookmarked, and the
 * exam they are sitting. */
export function useEditorStudy({
  activeIndex,
  annotations,
  fileId,
  onToolChange,
  pages,
}: EditorStudyOptions) {
  // Pens down: leaving a text field writes what was typed in it, so an answer
  // being written as time runs out is kept, and nothing more can be drawn by
  // accident once the page is back in the reader's hands.
  const handleTimeUp = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    onToolChange("select");
  }, [onToolChange]);

  const exam = useExamTimer(fileId, handleTimeUp);
  const covers = useCoverReveal(fileId, annotations, exam.isRunning);
  const bookmarks = usePageBookmarks(fileId, pages, activeIndex);

  return { bookmarks, covers, exam };
}
