import { EyeOffIcon } from "lucide-react";
import {
  EXAM_SOLUTION_COVER_TITLE,
  EXAM_TIME_LEFT_LABEL,
} from "@/config/pdf-editor";
import { formatCountdown } from "@/lib/pdf-editor/exam-clock";

interface ClipExamCoverProps {
  remaining: number;
}

/** Lies over a clip of a solution while its exam runs, with the time left. */
export function ClipExamCover({ remaining }: ClipExamCoverProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-1 bg-muted p-2 text-center">
      <EyeOffIcon className="size-4" />
      <p className="font-head text-xs">{EXAM_SOLUTION_COVER_TITLE}</p>
      <p
        aria-label={EXAM_TIME_LEFT_LABEL}
        className="font-head text-sm tabular-nums"
        role="timer"
      >
        {formatCountdown(remaining)}
      </p>
    </div>
  );
}
