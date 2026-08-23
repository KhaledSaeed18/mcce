import {
  TUITION_INTERNAL_LBP_RATE,
  TUITION_LBP_PER_CREDIT,
  TUITION_UNITS_PER_CREDIT,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";

const LBP_UNITS_PER_CREDIT = TUITION_UNITS_PER_CREDIT - TUITION_USD_PER_CREDIT;
const CASH_SHARE = (TUITION_USD_PER_CREDIT / TUITION_UNITS_PER_CREDIT) * 100;

export function TuitionCreditSplitBar() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-8 overflow-hidden rounded border-2">
        <div
          className="flex items-center justify-center bg-chart-2 font-head text-xs"
          style={{ width: `${CASH_SHARE}%` }}
        >
          {TUITION_USD_PER_CREDIT}
        </div>
        <div className="flex flex-1 items-center justify-center border-l-2 bg-chart-4 font-head text-xs">
          {LBP_UNITS_PER_CREDIT}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <p>
          <span className="font-medium">
            {formatUsd(TUITION_USD_PER_CREDIT)} in cash USD
          </span>
          <span className="block text-muted-foreground">
            {Math.round(CASH_SHARE * 10) / 10}% of the credit price
          </span>
        </p>
        <p className="text-right sm:text-left">
          <span className="font-medium">
            {formatLbp(TUITION_LBP_PER_CREDIT)}
          </span>
          <span className="block text-muted-foreground">
            {LBP_UNITS_PER_CREDIT} units at{" "}
            {formatLbp(TUITION_INTERNAL_LBP_RATE)} each
          </span>
        </p>
      </div>
    </div>
  );
}
