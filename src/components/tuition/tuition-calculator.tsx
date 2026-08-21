import { useMemo } from "react";
import { TuitionExportPanel } from "@/components/tuition/tuition-export-panel";
import { TuitionPlanControls } from "@/components/tuition/tuition-plan-controls";
import { TuitionResultsGrid } from "@/components/tuition/tuition-results-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TUITION_YEARLY_CHARGE_NOTE } from "@/config/tuition";
import { useTuitionCalculator } from "@/hooks/use-tuition-calculator";
import type { TuitionScenario } from "@/lib/tuition/types";

export function TuitionCalculator() {
  const {
    calculation,
    plan,
    setChargeSemesterIndex,
    setCreditsAt,
    setIncludeNssf,
    setIncludeRegistration,
    setSemesterCount,
  } = useTuitionCalculator();

  const scenario = useMemo<TuitionScenario>(
    () => ({ calculation, plan }),
    [calculation, plan]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tuition calculator</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <TuitionPlanControls
          chargeSemesterIndex={plan.chargeSemesterIndex}
          includeNssf={plan.includeNssf}
          includeRegistration={plan.includeRegistration}
          onChargeSemesterChange={setChargeSemesterIndex}
          onCreditsChange={setCreditsAt}
          onIncludeNssfChange={setIncludeNssf}
          onIncludeRegistrationChange={setIncludeRegistration}
          onSemesterCountChange={setSemesterCount}
          semesters={calculation.semesters}
        />

        <TuitionResultsGrid calculation={calculation} />

        <p className="text-muted-foreground text-xs">
          {TUITION_YEARLY_CHARGE_NOTE}
        </p>

        <TuitionExportPanel scenario={scenario} />
      </CardContent>
    </Card>
  );
}
