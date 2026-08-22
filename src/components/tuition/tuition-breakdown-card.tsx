import { TuitionBreakdownRow } from "@/components/tuition/tuition-breakdown-row";
import {
  TuitionCardFooter,
  TuitionCardTotal,
} from "@/components/tuition/tuition-card-footer";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type { TuitionBreakdown } from "@/lib/tuition/types";

interface TuitionBreakdownCardProps {
  breakdown: TuitionBreakdown;
  subtitle?: string;
  title: string;
}

export function TuitionBreakdownCard({
  breakdown,
  subtitle,
  title,
}: TuitionBreakdownCardProps) {
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
          label="Tuition (USD)"
          value={formatUsd(breakdown.tuitionUsd)}
        />
        <TuitionBreakdownRow
          label="Registration (USD)"
          value={formatUsd(breakdown.registrationUsd)}
        />
        <TuitionBreakdownRow
          label="Tuition (LBP)"
          value={formatLbp(breakdown.tuitionLbp)}
        />
        <TuitionBreakdownRow
          label="NSSF (LBP)"
          value={formatLbp(breakdown.nssfLbp)}
        />
      </dl>

      <TuitionCardFooter>
        <TuitionCardTotal
          label="Total (USD)"
          value={formatUsd(breakdown.totalUsd)}
        />
        <TuitionCardTotal
          label="Total (LBP)"
          value={formatLbp(breakdown.totalLbp)}
        />
      </TuitionCardFooter>
    </div>
  );
}
