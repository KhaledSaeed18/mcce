import { TuitionBreakdownRow } from "@/components/tuition/tuition-breakdown-row";
import {
  TuitionCardFooter,
  TuitionCardTotal,
} from "@/components/tuition/tuition-card-footer";
import { formatUsd } from "@/lib/tuition/calc";
import type { TuitionBreakdown } from "@/lib/tuition/types";

interface TuitionUsdBreakdownCardProps {
  breakdown: TuitionBreakdown;
  subtitle?: string;
  title: string;
}

export function TuitionUsdBreakdownCard({
  breakdown,
  subtitle,
  title,
}: TuitionUsdBreakdownCardProps) {
  const totalFinancialAidUsd =
    breakdown.financialAidUsd + breakdown.financialAidLbpAsUsd;

  return (
    <div className="bg-card rounded border-2 p-4">
      <h3 className="font-head text-sm">{title}</h3>
      {subtitle ? (
        <p className="text-muted-foreground mt-1 text-xs">{subtitle}</p>
      ) : null}

      <dl className="mt-3 space-y-2 text-sm">
        <TuitionBreakdownRow
          label="Credits"
          value={String(breakdown.credits)}
        />
        <TuitionBreakdownRow
          label="Tuition"
          value={formatUsd(breakdown.grossTuitionUsd)}
        />
        <TuitionBreakdownRow
          label="Registration"
          value={formatUsd(breakdown.registrationUsd)}
        />
        {totalFinancialAidUsd > 0 ? (
          <TuitionBreakdownRow
            label="Financial aid"
            value={`-${formatUsd(totalFinancialAidUsd)}`}
          />
        ) : null}
        <TuitionBreakdownRow
          label="LBP charges converted"
          value={formatUsd(breakdown.grossLbpAsUsd)}
        />
      </dl>

      <TuitionCardFooter>
        <TuitionCardTotal
          label="Total in USD"
          value={formatUsd(breakdown.combinedUsd)}
        />
      </TuitionCardFooter>
    </div>
  );
}
