import { TuitionBreakdownCard } from "@/components/tuition/tuition-breakdown-card";
import type { TuitionCalculation } from "@/lib/tuition/types";

interface TuitionResultsGridProps {
  calculation: TuitionCalculation;
}

export function TuitionResultsGrid({ calculation }: TuitionResultsGridProps) {
  const semesterCount = calculation.semesters.length;

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {calculation.semesters.map((semester) => (
        <TuitionBreakdownCard
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

      <TuitionBreakdownCard
        breakdown={calculation.annualProjection}
        subtitle={`Sum of ${semesterCount} ${semesterCount === 1 ? "semester" : "semesters"}.`}
        title="Annual projection"
      />
    </div>
  );
}
