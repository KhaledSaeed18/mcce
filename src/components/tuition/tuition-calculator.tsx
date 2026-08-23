import { useMemo } from "react";
import { TuitionExportPanel } from "@/components/tuition/tuition-export-panel";
import { TuitionPlanControls } from "@/components/tuition/tuition-plan-controls";
import { TuitionResultsGrid } from "@/components/tuition/tuition-results-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TUITION_AID_LBP_SHARE_PERCENT,
  TUITION_AID_SPILLOVER_NOTE,
  TUITION_FINANCIAL_AID_NOTE,
  TUITION_NSSF_CHARGE_NOTE,
  TUITION_RATE_NOTE,
} from "@/config/tuition";
import { useTuitionCalculator } from "@/hooks/use-tuition-calculator";
import type { TuitionScenario } from "@/lib/tuition/types";

export function TuitionCalculator() {
  const {
    calculation,
    plan,
    setCreditsAt,
    setFinancialAidPercent,
    setIncludeFinancialAid,
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

  const aidReachesCashUsd =
    plan.includeFinancialAid &&
    plan.financialAidPercent > TUITION_AID_LBP_SHARE_PERCENT;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Tuition calculator</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <TuitionPlanControls
          financialAidPercent={plan.financialAidPercent}
          includeFinancialAid={plan.includeFinancialAid}
          includeNssf={plan.includeNssf}
          includeRegistration={plan.includeRegistration}
          onCreditsChange={setCreditsAt}
          onFinancialAidPercentChange={setFinancialAidPercent}
          onIncludeFinancialAidChange={setIncludeFinancialAid}
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
          <p>{TUITION_NSSF_CHARGE_NOTE}</p>
          {plan.includeFinancialAid ? (
            <p>{TUITION_FINANCIAL_AID_NOTE}</p>
          ) : null}
          {aidReachesCashUsd ? <p>{TUITION_AID_SPILLOVER_NOTE}</p> : null}
          {plan.showAllInUsd ? <p>{TUITION_RATE_NOTE}</p> : null}
        </div>

        <TuitionExportPanel scenario={scenario} />
      </CardContent>
    </Card>
  );
}
