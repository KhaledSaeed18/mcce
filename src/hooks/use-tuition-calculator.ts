import { useCallback, useMemo } from "react";
import { useTuitionCalculatorStorage } from "@/hooks/use-tuition-calculator-storage";
import { buildTuitionCalculation } from "@/lib/tuition/calc";
import { clampSemesterCount, resizeCredits } from "@/lib/tuition/plan";
import type { TuitionPlan } from "@/lib/tuition/types";

export function useTuitionCalculator() {
  const {
    creditsPerSemester,
    financialAidPercent,
    includeFinancialAid,
    includeNssf,
    includeRegistration,
    showAllInUsd,
    usdToLbpRate,
    reset,
    setCreditsPerSemester,
    setFinancialAidPercent,
    setIncludeFinancialAid,
    setIncludeNssf,
    setIncludeRegistration,
    setShowAllInUsd,
    setUsdToLbpRate,
  } = useTuitionCalculatorStorage();

  const setSemesterCount = useCallback(
    (value: number) =>
      setCreditsPerSemester(
        resizeCredits(creditsPerSemester, clampSemesterCount(value))
      ),
    [creditsPerSemester, setCreditsPerSemester]
  );

  const setCreditsAt = useCallback(
    (index: number, value: number) =>
      setCreditsPerSemester(
        creditsPerSemester.map((credits, position) =>
          position === index ? value : credits
        )
      ),
    [creditsPerSemester, setCreditsPerSemester]
  );

  const plan = useMemo<TuitionPlan>(
    () => ({
      creditsPerSemester,
      financialAidPercent,
      includeFinancialAid,
      includeNssf,
      includeRegistration,
      showAllInUsd,
      usdToLbpRate,
    }),
    [
      creditsPerSemester,
      financialAidPercent,
      includeFinancialAid,
      includeNssf,
      includeRegistration,
      showAllInUsd,
      usdToLbpRate,
    ]
  );

  const calculation = useMemo(() => buildTuitionCalculation(plan), [plan]);

  return {
    calculation,
    plan,
    reset,
    setCreditsAt,
    setFinancialAidPercent,
    setIncludeFinancialAid,
    setIncludeNssf,
    setIncludeRegistration,
    setSemesterCount,
    setShowAllInUsd,
    setUsdToLbpRate,
  };
}
