import { type ChangeEvent, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TUITION_MAX_CREDITS_PER_SEMESTER } from "@/config/tuition";

interface TuitionSemesterCreditsFieldProps {
  carriesYearlyCharges: boolean;
  credits: number;
  index: number;
  label: string;
  onCreditsChange: (index: number, credits: number) => void;
}

export function TuitionSemesterCreditsField({
  carriesYearlyCharges,
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
      <span className="flex items-center gap-2 font-medium text-sm">
        {label} credits
        {carriesYearlyCharges ? (
          <Badge variant="secondary">Yearly charges</Badge>
        ) : null}
      </span>
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
