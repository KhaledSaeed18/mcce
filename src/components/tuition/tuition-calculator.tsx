import { useMemo } from "react";
import { TuitionExportPanel } from "@/components/tuition/tuition-export-panel";
import { TuitionPlanControls } from "@/components/tuition/tuition-plan-controls";
import { TuitionResultsGrid } from "@/components/tuition/tuition-results-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TUITION_RATE_NOTE,
  TUITION_YEARLY_CHARGE_NOTE,
} from "@/config/tuition";
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
    setShowAllInUsd,
    setUsdToLbpRate,
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
          onRateChange={setUsdToLbpRate}
          onSemesterCountChange={setSemesterCount}
          onShowAllInUsdChange={setShowAllInUsd}
          semesters={calculation.semesters}
          showAllInUsd={plan.showAllInUsd}
          usdToLbpRate={plan.usdToLbpRate}
        />

        <TuitionResultsGrid
          calculation={calculation}
          showAllInUsd={plan.showAllInUsd}
        />

        <div className="flex flex-col gap-1 text-muted-foreground text-xs">
          <p>{TUITION_YEARLY_CHARGE_NOTE}</p>
          {plan.showAllInUsd ? <p>{TUITION_RATE_NOTE}</p> : null}
        </div>

        <TuitionExportPanel scenario={scenario} />
      </CardContent>
    </Card>
  );
}
