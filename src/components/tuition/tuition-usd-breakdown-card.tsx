import { TuitionBreakdownRow } from "@/components/tuition/tuition-breakdown-row";
import { TuitionTotalRow } from "@/components/tuition/tuition-total-row";
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
  return (
    <div className="rounded border-2 bg-card p-4">
      <h3 className="font-head text-sm">{title}</h3>
      {subtitle ? (
        <p className="mt-1 text-muted-foreground text-xs">{subtitle}</p>
      ) : null}

      <dl className="mt-3 space-y-2 text-sm">
        <TuitionBreakdownRow
          label="Credits"
          value={String(breakdown.credits)}
        />
        <TuitionBreakdownRow
          label="Tuition"
          value={formatUsd(breakdown.tuitionUsd)}
        />
        <TuitionBreakdownRow
          label="Registration"
          value={formatUsd(breakdown.registrationUsd)}
        />
        <TuitionBreakdownRow
          label="LBP charges converted"
          value={formatUsd(breakdown.lbpAsUsd)}
        />
        <TuitionTotalRow
          label="Total in USD"
          value={formatUsd(breakdown.combinedUsd)}
        />
      </dl>
    </div>
  );
}
