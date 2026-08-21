import { useCallback, useMemo, useState } from "react";
import { TUITION_DEFAULT_USD_TO_LBP_RATE } from "@/config/tuition";
import { buildTuitionCalculation } from "@/lib/tuition/calc";
import {
  clampSemesterCount,
  createDefaultCredits,
  resizeCredits,
} from "@/lib/tuition/plan";
import type { TuitionPlan } from "@/lib/tuition/types";

export function useTuitionCalculator() {
  const [creditsPerSemester, setCreditsPerSemester] =
    useState<number[]>(createDefaultCredits);
  const [chargeSemesterIndex, setChargeSemesterIndex] = useState(0);
  const [includeRegistration, setIncludeRegistration] = useState(true);
  const [includeNssf, setIncludeNssf] = useState(true);
  const [showAllInUsd, setShowAllInUsd] = useState(false);
  const [usdToLbpRate, setUsdToLbpRate] = useState(
    TUITION_DEFAULT_USD_TO_LBP_RATE
  );

  const setSemesterCount = useCallback((value: number) => {
    const count = clampSemesterCount(value);

    setCreditsPerSemester((current) => resizeCredits(current, count));
    setChargeSemesterIndex((current) => Math.min(current, count - 1));
  }, []);

  const setCreditsAt = useCallback((index: number, value: number) => {
    setCreditsPerSemester((current) =>
      current.map((credits, position) => (position === index ? value : credits))
    );
  }, []);

  const plan = useMemo<TuitionPlan>(
    () => ({
      chargeSemesterIndex,
      creditsPerSemester,
      includeNssf,
      includeRegistration,
      showAllInUsd,
      usdToLbpRate,
    }),
    [
      chargeSemesterIndex,
      creditsPerSemester,
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
    setChargeSemesterIndex,
    setCreditsAt,
    setIncludeNssf,
    setIncludeRegistration,
    setSemesterCount,
    setShowAllInUsd,
    setUsdToLbpRate,
  };
}
