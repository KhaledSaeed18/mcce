import { type ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  TUITION_MAX_FINANCIAL_AID_PERCENT,
  TUITION_MIN_FINANCIAL_AID_PERCENT,
} from "@/config/tuition";
import { clampFinancialAidPercent } from "@/lib/tuition/plan";

interface TuitionFinancialAidFieldProps {
  onPercentChange: (percent: number) => void;
  percent: number;
}

export function TuitionFinancialAidField({
  onPercentChange,
  percent,
}: TuitionFinancialAidFieldProps) {
  /* Typing is left alone and the value is pulled into range on blur, so a half typed number is never rewritten mid keystroke. */
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);

      onPercentChange(Number.isFinite(next) ? next : 0);
    },
    [onPercentChange]
  );

  const handleBlur = useCallback(
    () => onPercentChange(clampFinancialAidPercent(percent)),
    [onPercentChange, percent]
  );

  return (
    <label className="flex flex-col gap-1.5" htmlFor="financial-aid-percent">
      <span className="font-medium text-sm">Financial aid percent</span>
      <Input
        id="financial-aid-percent"
        max={TUITION_MAX_FINANCIAL_AID_PERCENT}
        min={TUITION_MIN_FINANCIAL_AID_PERCENT}
        onBlur={handleBlur}
        onChange={handleChange}
        step={1}
        type="number"
        value={String(percent)}
      />
      <span className="text-muted-foreground text-xs">
        Between {TUITION_MIN_FINANCIAL_AID_PERCENT} and{" "}
        {TUITION_MAX_FINANCIAL_AID_PERCENT}.
      </span>
    </label>
  );
}
