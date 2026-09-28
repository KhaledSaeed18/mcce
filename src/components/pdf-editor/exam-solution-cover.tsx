import { EyeOffIcon } from "lucide-react";
import {
  EXAM_SOLUTION_COVER_NOTE,
  EXAM_SOLUTION_COVER_TITLE,
  EXAM_TIME_LEFT_LABEL,
} from "@/config/pdf-editor";
import { formatCountdown } from "@/lib/pdf-editor/exam-clock";

interface ExamSolutionCoverProps {
  remaining: number;
}

/** Lies over a solution while the exam beside it runs, and cannot be
 * lifted until time is up. */
export function ExamSolutionCover({ remaining }: ExamSolutionCoverProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-muted p-6">
      <div className="flex max-w-xs flex-col items-center gap-2 rounded border-2 bg-card p-5 text-center shadow-md">
        <EyeOffIcon className="size-6" />
        <p className="font-head text-sm">{EXAM_SOLUTION_COVER_TITLE}</p>
        <p className="text-muted-foreground text-sm">
          {EXAM_SOLUTION_COVER_NOTE}
        </p>
        <p
          aria-label={EXAM_TIME_LEFT_LABEL}
          className="font-head text-lg tabular-nums"
          role="timer"
        >
          {formatCountdown(remaining)}
        </p>
      </div>
    </div>
  );
}
