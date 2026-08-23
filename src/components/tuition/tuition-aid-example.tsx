import { TuitionBreakdownRow } from "@/components/tuition/tuition-breakdown-row";
import {
  TuitionCardFooter,
  TuitionCardTotal,
} from "@/components/tuition/tuition-card-footer";
import {
  TUITION_INTERNAL_LBP_RATE,
  TUITION_UNITS_PER_CREDIT,
} from "@/config/tuition";
import type { TuitionAidExample as AidExample } from "@/lib/tuition/aid-example";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";

interface TuitionAidExampleProps {
  example: AidExample;
}

const UNIT_FORMAT = new Intl.NumberFormat("en-US");

export function TuitionAidExample({ example }: TuitionAidExampleProps) {
  const { aidUnits, breakdown, credits, grossUnits, percent } = example;

  return (
    <div className="rounded border-2 bg-background p-4">
      <h3 className="font-head text-sm">
        Worked example: {credits} credits at {percent}%
      </h3>

      <dl className="mt-3 space-y-2 text-sm">
        <TuitionBreakdownRow
          label={`Tuition, ${credits} credits at ${TUITION_UNITS_PER_CREDIT}`}
          value={UNIT_FORMAT.format(grossUnits)}
        />
        <TuitionBreakdownRow
          label={`Financial aid, ${percent}% of that`}
          value={`-${UNIT_FORMAT.format(aidUnits)}`}
        />
        <TuitionBreakdownRow
          label={`Charged to the LBP side at ${UNIT_FORMAT.format(TUITION_INTERNAL_LBP_RATE)}`}
          value={`-${formatLbp(breakdown.financialAidLbp)}`}
        />
        <TuitionBreakdownRow
          label="Cash USD tuition, untouched"
          value={formatUsd(breakdown.grossTuitionUsd)}
        />
        <TuitionBreakdownRow
          label="Registration, never covered"
          value={formatUsd(breakdown.registrationUsd)}
        />
      </dl>

      <TuitionCardFooter>
        <TuitionCardTotal
          label="You pay (USD)"
          value={formatUsd(breakdown.totalUsd)}
        />
        <TuitionCardTotal
          label="You pay (LBP)"
          value={formatLbp(breakdown.totalLbp)}
        />
      </TuitionCardFooter>
    </div>
  );
}
