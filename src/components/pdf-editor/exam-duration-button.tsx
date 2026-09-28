import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { formatDuration } from "@/lib/pdf-editor/exam-clock";

interface ExamDurationButtonProps {
  minutes: number;
  onStart: (minutes: number) => void;
}

export function ExamDurationButton({
  minutes,
  onStart,
}: ExamDurationButtonProps) {
  const handleClick = useCallback(() => onStart(minutes), [minutes, onStart]);

  return (
    <Button onClick={handleClick} size="sm" variant="outline">
      {formatDuration(minutes)}
    </Button>
  );
}
