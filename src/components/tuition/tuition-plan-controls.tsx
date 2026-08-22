import { useCallback, useMemo } from "react";
import { TuitionCurrencyControls } from "@/components/tuition/tuition-currency-controls";
import { TuitionPlanSelect } from "@/components/tuition/tuition-plan-select";
import { TuitionSemesterCreditsField } from "@/components/tuition/tuition-semester-credits-field";
import { TuitionToggleRow } from "@/components/tuition/tuition-toggle-row";
import {
  TUITION_FINANCIAL_AID_COVERAGE_OPTIONS,
  TUITION_MAX_SEMESTERS_PER_YEAR,
  TUITION_MIN_SEMESTERS_PER_YEAR,
} from "@/config/tuition";
import type {
  TuitionFinancialAidCoverage,
  TuitionSemesterBreakdown,
} from "@/lib/tuition/types";

interface TuitionPlanControlsProps {
  chargeSemesterIndex: number;
  financialAidCoverage: TuitionFinancialAidCoverage;
  financialAidPercent: number;
  includeFinancialAid: boolean;
  includeNssf: boolean;
  includeRegistration: boolean;
  onChargeSemesterChange: (index: number) => void;
  onCreditsChange: (index: number, credits: number) => void;
  onFinancialAidCoverageChange: (coverage: TuitionFinancialAidCoverage) => void;
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

const SEMESTER_COUNT_OPTIONS = Array.from(
  {
    length: TUITION_MAX_SEMESTERS_PER_YEAR - TUITION_MIN_SEMESTERS_PER_YEAR + 1,
  },
  (_, index) => {
    const count = String(TUITION_MIN_SEMESTERS_PER_YEAR + index);

    return { label: count, value: count };
  }
);

const FINANCIAL_AID_PERCENT_OPTIONS = Array.from({ length: 10 }, (_, index) => {
  const percent = String(10 + index * 10);

  return { label: `${percent}%`, value: percent };
});

export function TuitionPlanControls({
  chargeSemesterIndex,
  financialAidCoverage,
  financialAidPercent,
  includeFinancialAid,
  includeNssf,
  includeRegistration,
  onChargeSemesterChange,
  onCreditsChange,
  onFinancialAidCoverageChange,
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

  const handleChargeSemesterChange = useCallback(
    (value: string) => onChargeSemesterChange(Number(value)),
    [onChargeSemesterChange]
  );

  const handleFinancialAidPercentChange = useCallback(
    (value: string) => onFinancialAidPercentChange(Number(value)),
    [onFinancialAidPercentChange]
  );

  const handleFinancialAidCoverageChange = useCallback(
    (value: string) =>
      onFinancialAidCoverageChange(value as TuitionFinancialAidCoverage),
    [onFinancialAidCoverageChange]
  );

  const chargeSemesterOptions = useMemo(
    () =>
      semesters.map((semester, index) => ({
        label: semester.label,
        value: String(index),
      })),
    [semesters]
  );

  const chargeSemesterLabel =
    semesters[chargeSemesterIndex]?.label ?? semesters[0]?.label ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TuitionPlanSelect
          label="Semesters this year"
          onValueChange={handleSemesterCountChange}
          options={SEMESTER_COUNT_OPTIONS}
          value={String(semesters.length)}
        />

        <TuitionPlanSelect
          label="Semester billed yearly charges"
          onValueChange={handleChargeSemesterChange}
          options={chargeSemesterOptions}
          value={String(chargeSemesterIndex)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {semesters.map((semester, index) => (
          <TuitionSemesterCreditsField
            carriesYearlyCharges={semester.carriesYearlyCharges}
            credits={semester.credits}
            index={index}
            key={semester.label}
            label={semester.label}
            onCreditsChange={onCreditsChange}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TuitionToggleRow
          checked={includeRegistration}
          description={`Adds the yearly registration in ${chargeSemesterLabel}.`}
          id="registration-switch"
          label="Include yearly registration"
          onCheckedChange={onIncludeRegistrationChange}
        />
        <TuitionToggleRow
          checked={includeNssf}
          description={`Adds the yearly NSSF in ${chargeSemesterLabel}.`}
          id="nssf-switch"
          label="Include NSSF"
          onCheckedChange={onIncludeNssfChange}
        />
      </div>

      <TuitionToggleRow
        checked={includeFinancialAid}
        description="Reduces tuition fees by a percentage. Registration and NSSF are not covered."
        id="financial-aid-switch"
        label="Financial aid"
        onCheckedChange={onIncludeFinancialAidChange}
      />

      {includeFinancialAid ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TuitionPlanSelect
            label="Financial aid percent"
            onValueChange={handleFinancialAidPercentChange}
            options={FINANCIAL_AID_PERCENT_OPTIONS}
            value={String(financialAidPercent)}
          />
          <TuitionPlanSelect
            label="Financial aid covers"
            onValueChange={handleFinancialAidCoverageChange}
            options={[...TUITION_FINANCIAL_AID_COVERAGE_OPTIONS]}
            value={financialAidCoverage}
          />
        </div>
      ) : null}

      <TuitionCurrencyControls
        onRateChange={onRateChange}
        onShowAllInUsdChange={onShowAllInUsdChange}
        showAllInUsd={showAllInUsd}
        usdToLbpRate={usdToLbpRate}
      />
    </div>
  );
}
