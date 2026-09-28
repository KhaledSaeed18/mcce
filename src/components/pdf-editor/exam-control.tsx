import { ExamCountdown } from "@/components/pdf-editor/exam-countdown";
import { ExamStartMenu } from "@/components/pdf-editor/exam-start-menu";
import type { ExamTimer } from "@/hooks/use-exam-timer";

interface ExamControlProps {
  exam: ExamTimer;
}

/** Starts an exam, or shows the one under way. */
export function ExamControl({ exam }: ExamControlProps) {
  if (exam.isRunning) {
    return (
      <ExamCountdown
        isWarning={exam.isWarning}
        onEnd={exam.end}
        remaining={exam.remaining}
      />
    );
  }
  return <ExamStartMenu onStart={exam.start} />;
}
