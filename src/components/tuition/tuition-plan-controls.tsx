import { useCallback } from "react";
import { TuitionSemesterCreditsField } from "@/components/tuition/tuition-semester-credits-field";
import { TuitionToggleRow } from "@/components/tuition/tuition-toggle-row";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  onSemesterCountChange: (count: number) => void;
  semesters: TuitionSemesterBreakdown[];
}

const SEMESTER_COUNT_OPTIONS = Array.from(
  {
    length: TUITION_MAX_SEMESTERS_PER_YEAR - TUITION_MIN_SEMESTERS_PER_YEAR + 1,
  },
  (_, index) => TUITION_MIN_SEMESTERS_PER_YEAR + index
);

export function TuitionPlanControls({
  chargeSemesterIndex,
  includeNssf,
  includeRegistration,
  onChargeSemesterChange,
  onCreditsChange,
  onIncludeNssfChange,
  onIncludeRegistrationChange,
  onSemesterCountChange,
  semesters,
}: TuitionPlanControlsProps) {
  const handleSemesterCountChange = useCallback(
    (value: string | null) => onSemesterCountChange(Number(value)),
    [onSemesterCountChange]
  );

  const handleChargeSemesterChange = useCallback(
    (value: string | null) => onChargeSemesterChange(Number(value)),
    [onChargeSemesterChange]
  );

  const chargeSemesterLabel =
    semesters[chargeSemesterIndex]?.label ?? semesters[0]?.label ?? "";

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <span className="font-medium text-sm">Semesters this year</span>
          <Select
            onValueChange={handleSemesterCountChange}
            value={String(semesters.length)}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{() => String(semesters.length)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SEMESTER_COUNT_OPTIONS.map((count) => (
                  <SelectItem key={count} value={String(count)}>
                    {count}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-medium text-sm">
            Semester billed yearly charges
          </span>
          <Select
            onValueChange={handleChargeSemesterChange}
            value={String(chargeSemesterIndex)}
          >
            <SelectTrigger className="w-full">
              <SelectValue>{() => chargeSemesterLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {semesters.map((semester, index) => (
                  <SelectItem key={semester.label} value={String(index)}>
                    {semester.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
    </div>
  );
}
