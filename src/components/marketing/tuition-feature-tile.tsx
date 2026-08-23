import { Link } from "@tanstack/react-router";
import { DollarSignIcon } from "lucide-react";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { Badge } from "@/components/ui/badge";
import {
  TUITION_ACADEMIC_YEAR_LABEL,
  TUITION_DEFAULT_USD_TO_LBP_RATE,
  TUITION_LBP_PER_CREDIT,
  TUITION_REGISTRATION_USD_YEARLY,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import {
  buildTuitionCalculation,
  formatLbp,
  formatUsd,
} from "@/lib/tuition/calc";
import { createDefaultCredits } from "@/lib/tuition/plan";
import type { TuitionPlan } from "@/lib/tuition/types";

/** The default plan the calculator opens on, kept in USD only so the tile does
 * not have to explain a conversion rate it cannot let the reader change. */
const PREVIEW_PLAN: TuitionPlan = {
  chargeSemesterIndex: 0,
  creditsPerSemester: createDefaultCredits(),
  financialAidPercent: 40,
  includeFinancialAid: false,
  includeNssf: false,
  includeRegistration: true,
  showAllInUsd: false,
  usdToLbpRate: TUITION_DEFAULT_USD_TO_LBP_RATE,
};

const PREVIEW = buildTuitionCalculation(PREVIEW_PLAN);

const PREVIEW_ROWS = [
  ...PREVIEW.semesters.map((semester) => ({
    amount: semester.tuitionUsd,
    label: `${semester.label} · ${semester.credits} credits`,
  })),
  { amount: TUITION_REGISTRATION_USD_YEARLY, label: "Registration, yearly" },
];

export function TuitionFeatureTile() {
  return (
    <Link className="block h-full" to="/tuition-fees">
      <FeatureTile
        color="chart-4"
        description="The official per credit rates in both currencies, and a planner that turns the credits you intend to take into a semester and year total you can export."
        icon={DollarSignIcon}
        interactive
        linkLabel="Open the planner"
        title="Work out the year's fees"
      >
        <div className="flex flex-col gap-3">
          <dl className="flex flex-col gap-1.5 rounded border-2 bg-background px-3 py-2 shadow-sm">
            {PREVIEW_ROWS.map((row) => (
              <div className="flex items-baseline gap-3" key={row.label}>
                <dt className="flex-1 truncate text-muted-foreground text-xs">
                  {row.label}
                </dt>
                <dd className="font-head text-xs tabular-nums">
                  {formatUsd(row.amount)}
                </dd>
              </div>
            ))}

            <div className="flex items-baseline gap-3 border-t-2 pt-1.5">
              <dt className="flex-1 font-head text-xs">Year total</dt>
              <dd className="font-head text-sm tabular-nums">
                {formatUsd(PREVIEW.annualProjection.totalUsd)}
              </dd>
            </div>
          </dl>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">
              {formatUsd(TUITION_USD_PER_CREDIT)} per credit
            </Badge>
            <Badge variant="outline">
              {formatLbp(TUITION_LBP_PER_CREDIT)} per credit
            </Badge>
            <Badge variant="outline">{TUITION_ACADEMIC_YEAR_LABEL}</Badge>
          </div>
        </div>
      </FeatureTile>
    </Link>
  );
}
