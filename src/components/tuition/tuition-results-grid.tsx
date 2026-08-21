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
  const BreakdownCard = showAllInUsd
    ? TuitionUsdBreakdownCard
    : TuitionBreakdownCard;

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {calculation.semesters.map((semester) => (
        <BreakdownCard
          breakdown={semester}
          key={semester.label}
          subtitle={
            semester.carriesYearlyCharges
              ? "Carries the yearly registration and NSSF."
              : "Tuition only."
          }
          title={`${semester.label} semester`}
        />
      ))}

      <BreakdownCard
        breakdown={calculation.annualProjection}
        subtitle={`Sum of ${semesterCount} ${semesterCount === 1 ? "semester" : "semesters"}.`}
        title="Annual projection"
      />
    </div>
  );
}
