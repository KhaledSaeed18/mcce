import { SquareIcon, TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  EDITOR_CONTROL_HEIGHT_CLASS,
  EXAM_END_LABEL,
  EXAM_TIME_LEFT_LABEL,
} from "@/config/pdf-editor";
import { formatCountdown } from "@/lib/pdf-editor/exam-clock";
import { cn } from "@/lib/utils";

interface ExamCountdownProps {
  isWarning: boolean;
  onEnd: () => void;
  remaining: number;
}

/** The time left in the exam, and a way to stop it early. */
export function ExamCountdown({
  isWarning,
  onEnd,
  remaining,
}: ExamCountdownProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded border-2 pr-0.5 pl-2 shadow-sm",
        EDITOR_CONTROL_HEIGHT_CLASS,
        isWarning
          ? "bg-destructive text-destructive-foreground"
          : "bg-card text-card-foreground"
      )}
    >
      <TimerIcon className="size-4 shrink-0" />
      <span
        aria-label={EXAM_TIME_LEFT_LABEL}
        className="font-head text-sm tabular-nums"
        role="timer"
      >
        {formatCountdown(remaining)}
      </span>
      <Button
        aria-label={EXAM_END_LABEL}
        className="size-7 p-0"
        onClick={onEnd}
        size="icon"
        title={EXAM_END_LABEL}
        variant="ghost"
      >
        <SquareIcon className="size-3.5 fill-current" />
      </Button>
    </div>
  );
}
