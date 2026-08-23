import { useCallback } from "react";
import { TuitionCurrencyControls } from "@/components/tuition/tuition-currency-controls";
import { TuitionFinancialAidField } from "@/components/tuition/tuition-financial-aid-field";
import { TuitionPlanSelect } from "@/components/tuition/tuition-plan-select";
import { TuitionSemesterCreditsField } from "@/components/tuition/tuition-semester-credits-field";
import { TuitionToggleRow } from "@/components/tuition/tuition-toggle-row";
import {
  TUITION_FINANCIAL_AID_NOTE,
  TUITION_MAX_SEMESTERS_PER_YEAR,
  TUITION_MIN_SEMESTERS_PER_YEAR,
} from "@/config/tuition";
import type { TuitionSemesterBreakdown } from "@/lib/tuition/types";
import { cn } from "@/lib/utils";

interface TuitionPlanControlsProps {
  financialAidPercent: number;
  includeFinancialAid: boolean;
  includeNssf: boolean;
  includeRegistration: boolean;
  onCreditsChange: (index: number, credits: number) => void;
  onFinancialAidPercentChange: (percent: number) => void;
  onIncludeFinancialAidChange: (checked: boolean) => void;
  onIncludeNssfChange: (checked: boolean) => void;
  onIncludeRegistrationChange: (checked: boolean) => void;
  onRateChange: (rate: number) => void;
  onSemesterCountChange: (count: number) => void;
  onShowAllInUsdChange: (checked: boolean) => void;
  semesters: TuitionSemesterBreakdown[];
  showAllInUsd: boolean;
  usdToLbpRate: number;
}

/** One row for the whole plan: the semester count plus one field per semester. */
const SEMESTER_GRID_COLUMNS: Record<number, string> = {
  1: "lg:grid-cols-2",
  2: "lg:grid-cols-3",
  3: "lg:grid-cols-4",
};

const SEMESTER_COUNT_OPTIONS = Array.from(
  {
    length: TUITION_MAX_SEMESTERS_PER_YEAR - TUITION_MIN_SEMESTERS_PER_YEAR + 1,
  },
  (_, index) => {
    const count = String(TUITION_MIN_SEMESTERS_PER_YEAR + index);

    return { label: count, value: count };
  }
);

export function TuitionPlanControls({
  financialAidPercent,
  includeFinancialAid,
  includeNssf,
  includeRegistration,
  onCreditsChange,
  onFinancialAidPercentChange,
  onIncludeFinancialAidChange,
  onIncludeNssfChange,
  onIncludeRegistrationChange,
  onRateChange,
  onSemesterCountChange,
  onShowAllInUsdChange,
  semesters,
  showAllInUsd,
  usdToLbpRate,
}: TuitionPlanControlsProps) {
  const handleSemesterCountChange = useCallback(
    (value: string) => onSemesterCountChange(Number(value)),
    [onSemesterCountChange]
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          SEMESTER_GRID_COLUMNS[semesters.length]
        )}
      >
        <TuitionPlanSelect
          label="Semesters this year"
          onValueChange={handleSemesterCountChange}
          options={SEMESTER_COUNT_OPTIONS}
          value={String(semesters.length)}
        />

        {semesters.map((semester, index) => (
          <TuitionSemesterCreditsField
            credits={semester.credits}
            index={index}
            key={semester.label}
            label={semester.label}
            onCreditsChange={onCreditsChange}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TuitionToggleRow
          checked={includeRegistration}
          description="Adds the registration fee in every semester."
          id="registration-switch"
          label="Include registration"
          onCheckedChange={onIncludeRegistrationChange}
        />
        <TuitionToggleRow
          checked={includeNssf}
          description="Adds the yearly NSSF once, outside the semester totals."
          id="nssf-switch"
          label="Include NSSF"
          onCheckedChange={onIncludeNssfChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TuitionToggleRow
          checked={includeFinancialAid}
          description={TUITION_FINANCIAL_AID_NOTE}
          id="financial-aid-switch"
          label="Financial aid"
          onCheckedChange={onIncludeFinancialAidChange}
        />

        {includeFinancialAid ? (
          <TuitionFinancialAidField
            onPercentChange={onFinancialAidPercentChange}
            percent={financialAidPercent}
          />
        ) : null}
      </div>

      <TuitionCurrencyControls
        onRateChange={onRateChange}
        onShowAllInUsdChange={onShowAllInUsdChange}
        showAllInUsd={showAllInUsd}
        usdToLbpRate={usdToLbpRate}
      />
    </div>
  );
}
