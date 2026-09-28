import { useCallback, useEffect, useState } from "react";
import { EXAM_TICK_MS, EXAM_WARNING_MS } from "@/config/pdf-editor";
import { useNow } from "@/hooks/use-now";
import { getRemaining, startExam } from "@/lib/pdf-editor/exam-clock";
import { readExam, removeExam, writeExam } from "@/lib/pdf-editor/exam-storage";
import type { ExamSession } from "@/lib/pdf-editor/types";

interface ExamState {
  fileId: string | undefined;
  /** Time ran out and the reader has not been told yet. */
  isOver: boolean;
  session: ExamSession | null;
}

const NO_EXAM: ExamState = { fileId: undefined, isOver: false, session: null };

/**
 * A timed attempt at the open file. The end time is kept in this browser, so
 * a reload carries on the countdown, and an exam whose time ran out while the
 * file was closed is over when it is opened again.
 */
export function useExamTimer(fileId: string | undefined, onTimeUp: () => void) {
  const [state, setState] = useState<ExamState>(NO_EXAM);
  // Until the new file's exam is read, the last file's is not its own.
  const { isOver, session } = state.fileId === fileId ? state : NO_EXAM;
  const now = useNow(session !== null, EXAM_TICK_MS);
  const remaining = session ? getRemaining(session, now) : 0;

  useEffect(() => {
    if (!fileId) {
      setState(NO_EXAM);
      return;
    }
    const stored = readExam(fileId);
    const hasExpired = stored !== null && stored.endsAt <= Date.now();
    if (hasExpired) {
      removeExam(fileId);
    }
    setState({
      fileId,
      isOver: hasExpired,
      session: hasExpired ? null : stored,
    });
  }, [fileId]);

  useEffect(() => {
    if (!(fileId && session) || remaining > 0) {
      return;
    }
    removeExam(fileId);
    setState({ fileId, isOver: true, session: null });
    onTimeUp();
  }, [fileId, onTimeUp, remaining, session]);

  const start = useCallback(
    (minutes: number) => {
      if (!fileId) {
        return;
      }
      const next = startExam(minutes, Date.now());
      writeExam(fileId, next);
      setState({ fileId, isOver: false, session: next });
    },
    [fileId]
  );

  /** Stops an exam early, or puts one that ran out away once the reader knows. */
  const end = useCallback(() => {
    if (fileId) {
      removeExam(fileId);
    }
    setState({ fileId, isOver: false, session: null });
  }, [fileId]);

  return {
    end,
    isOver,
    isRunning: session !== null,
    isWarning: session !== null && remaining <= EXAM_WARNING_MS,
    remaining,
    start,
  };
}

export type ExamTimer = ReturnType<typeof useExamTimer>;
