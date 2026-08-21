import { useCallback, useMemo } from "react";
import { TuitionCurrencyControls } from "@/components/tuition/tuition-currency-controls";
import { TuitionPlanSelect } from "@/components/tuition/tuition-plan-select";
import { TuitionSemesterCreditsField } from "@/components/tuition/tuition-semester-credits-field";
import { TuitionToggleRow } from "@/components/tuition/tuition-toggle-row";
import {
  TUITION_MAX_SEMESTERS_PER_YEAR,
  TUITION_MIN_SEMESTERS_PER_YEAR,
} from "@/config/tuition";
import type { TuitionSemesterBreakdown } from "@/lib/tuition/types";

interface TuitionPlanControlsProps {
  chargeSemesterIndex: number;
  includeNssf: boolean;
  includeRegistration: boolean;
  onChargeSemesterChange: (index: number) => void;
  onCreditsChange: (index: number, credits: number) => void;
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

export function TuitionPlanControls({
  chargeSemesterIndex,
  includeNssf,
  includeRegistration,
  onChargeSemesterChange,
  onCreditsChange,
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

      <TuitionCurrencyControls
        onRateChange={onRateChange}
        onShowAllInUsdChange={onShowAllInUsdChange}
        showAllInUsd={showAllInUsd}
        usdToLbpRate={usdToLbpRate}
      />
    </div>
  );
}
