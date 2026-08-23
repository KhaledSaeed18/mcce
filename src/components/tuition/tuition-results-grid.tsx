import { TuitionBreakdownCard } from "@/components/tuition/tuition-breakdown-card";
import { TuitionUsdBreakdownCard } from "@/components/tuition/tuition-usd-breakdown-card";
import type { TuitionCalculation } from "@/lib/tuition/types";

interface TuitionResultsGridProps {
  calculation: TuitionCalculation;
  showAllInUsd: boolean;
}

export function TuitionResultsGrid({
  calculation,
  showAllInUsd,
}: TuitionResultsGridProps) {
  const semesterCount = calculation.semesters.length;
  const semesterLabel = semesterCount === 1 ? "semester" : "semesters";
  const annualSubtitle =
    calculation.yearlyCharges.nssfLbp > 0
      ? `Sum of ${semesterCount} ${semesterLabel} and the yearly NSSF.`
      : `Sum of ${semesterCount} ${semesterLabel}.`;
  const BreakdownCard = showAllInUsd
    ? TuitionUsdBreakdownCard
    : TuitionBreakdownCard;

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {calculation.semesters.map((semester) => (
        <BreakdownCard
          breakdown={semester}
          key={semester.label}
          subtitle="Tuition and registration."
          title={`${semester.label} semester`}
        />
      ))}

      <BreakdownCard
        breakdown={calculation.annualProjection}
        subtitle={annualSubtitle}
        title="Annual projection"
      />
    </div>
  );
}
