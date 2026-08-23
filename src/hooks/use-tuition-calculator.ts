import { useCallback, useMemo } from "react";
import { useTuitionCalculatorStorage } from "@/hooks/use-tuition-calculator-storage";
import { buildTuitionCalculation } from "@/lib/tuition/calc";
import { clampSemesterCount, resizeCredits } from "@/lib/tuition/plan";
import type { TuitionPlan } from "@/lib/tuition/types";

export function useTuitionCalculator() {
  const {
    creditsPerSemester,
    chargeSemesterIndex,
    financialAidPercent,
    includeFinancialAid,
    includeNssf,
    includeRegistration,
    showAllInUsd,
    usdToLbpRate,
    reset,
    setCreditsPerSemester,
    setChargeSemesterIndex,
    setFinancialAidPercent,
    setIncludeFinancialAid,
    setIncludeNssf,
    setIncludeRegistration,
    setShowAllInUsd,
    setUsdToLbpRate,
  } = useTuitionCalculatorStorage();

  const setSemesterCount = useCallback(
    (value: number) => {
      const count = clampSemesterCount(value);

      setCreditsPerSemester(resizeCredits(creditsPerSemester, count));
      setChargeSemesterIndex(Math.min(chargeSemesterIndex, count - 1));
    },
    [
      creditsPerSemester,
      chargeSemesterIndex,
      setChargeSemesterIndex,
      setCreditsPerSemester,
    ]
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
      chargeSemesterIndex,
      creditsPerSemester,
      financialAidPercent,
      includeFinancialAid,
      includeNssf,
      includeRegistration,
      showAllInUsd,
      usdToLbpRate,
    }),
    [
      chargeSemesterIndex,
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
    setChargeSemesterIndex,
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
