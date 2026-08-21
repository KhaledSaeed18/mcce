import { type ChangeEvent, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  TUITION_MIN_USD_TO_LBP_RATE,
  TUITION_USD_TO_LBP_RATE_STEP,
} from "@/config/tuition";
import { formatLbp } from "@/lib/tuition/calc";

interface TuitionRateFieldProps {
  onRateChange: (rate: number) => void;
  usdToLbpRate: number;
}

export function TuitionRateField({
  onRateChange,
  usdToLbpRate,
}: TuitionRateFieldProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const next = Number(event.target.value);
      onRateChange(Number.isFinite(next) ? next : 0);
    },
    [onRateChange]
  );

  return (
    <label className="flex flex-col gap-1.5" htmlFor="usd-rate-input">
      <span className="font-medium text-sm">Exchange rate</span>
      <Input
        id="usd-rate-input"
        min={TUITION_MIN_USD_TO_LBP_RATE}
        onChange={handleChange}
        step={TUITION_USD_TO_LBP_RATE_STEP}
        type="number"
        value={String(usdToLbpRate)}
      />
      <span className="text-muted-foreground text-xs">
        1 USD = {formatLbp(usdToLbpRate)}
      </span>
    </label>
  );
}
