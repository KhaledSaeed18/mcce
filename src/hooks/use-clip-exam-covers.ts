import { useMemo } from "react";
import { EXAM_TICK_MS } from "@/config/pdf-editor";
import { useNow } from "@/hooks/use-now";
import { findClipExamPaper } from "@/lib/pdf-editor/clips/clip-exam-paper";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import { getRemaining } from "@/lib/pdf-editor/exam-clock";
import { readExam } from "@/lib/pdf-editor/exam-storage";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

/** The time left on each clip covered by an exam: a clip from the solution
 * of a paper whose exam is running stays covered until time is up, as the
 * solution's pane does. Clips from anything else are allowed, like a
 * formula sheet. */
export function useClipExamCovers(
  clips: readonly EditorClip[],
  nodes: EditorTreeNode[]
): ReadonlyMap<string, number> {
  const papers = useMemo(
    () =>
      clips.flatMap((clip) => {
        const paperId = findClipExamPaper(clip, nodes);
        return paperId ? [{ clipId: clip.id, paperId }] : [];
      }),
    [clips, nodes]
  );
  // Read on every render, so an exam started or ended in a pane counts at once.
  const exams = papers.map(({ clipId, paperId }) => ({
    clipId,
    exam: readExam(paperId),
  }));
  const now = useNow(
    exams.some(({ exam }) => exam !== null),
    EXAM_TICK_MS
  );

  const covers = new Map<string, number>();
  for (const { clipId, exam } of exams) {
    const remaining = exam ? getRemaining(exam, now) : 0;
    if (remaining > 0) {
      covers.set(clipId, remaining);
    }
  }
  return covers;
}
