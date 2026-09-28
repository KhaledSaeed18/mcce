import { TimerIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { ExamDurationButton } from "@/components/pdf-editor/exam-duration-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EXAM_DURATIONS,
  EXAM_START_DESCRIPTION,
  EXAM_START_LABEL,
} from "@/config/pdf-editor";

interface ExamStartMenuProps {
  onStart: (minutes: number) => void;
}

/** Picks how long the exam lasts, which starts it. */
export function ExamStartMenu({ onStart }: ExamStartMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStart = useCallback(
    (minutes: number) => {
      setIsOpen(false);
      onStart(minutes);
    },
    [onStart]
  );

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        render={
          <Button
            aria-label={EXAM_START_LABEL}
            size="icon"
            title={EXAM_START_LABEL}
            variant="outline"
          />
        }
      >
        <TimerIcon />
      </PopoverTrigger>
      <PopoverContent align="end">
        <PopoverHeader>
          <PopoverTitle>{EXAM_START_LABEL}</PopoverTitle>
          <PopoverDescription>{EXAM_START_DESCRIPTION}</PopoverDescription>
        </PopoverHeader>
        <div className="grid grid-cols-3 gap-2">
          {EXAM_DURATIONS.map((minutes) => (
            <ExamDurationButton
              key={minutes}
              minutes={minutes}
              onStart={handleStart}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
