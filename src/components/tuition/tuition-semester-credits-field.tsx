import { type ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { TUITION_MAX_CREDITS_PER_SEMESTER } from "@/config/tuition";

interface TuitionSemesterCreditsFieldProps {
  credits: number;
  index: number;
  label: string;
  onCreditsChange: (index: number, credits: number) => void;
}

export function TuitionSemesterCreditsField({
  credits,
  index,
  label,
  onCreditsChange,
}: TuitionSemesterCreditsFieldProps) {
  const inputId = `semester-credits-${index}`;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      onCreditsChange(index, Number.isFinite(next) ? next : 0);
    },
    [index, onCreditsChange]
  );

  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      <span className="font-medium text-sm">{label} credits</span>
      <Input
        id={inputId}
        max={TUITION_MAX_CREDITS_PER_SEMESTER}
        min={0}
        onChange={handleChange}
        step={1}
        type="number"
        value={String(credits)}
      />
    </label>
  );
}
