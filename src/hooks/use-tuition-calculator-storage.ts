import { useCallback, useEffect, useState } from "react";
import { TUITION_STORAGE_KEY } from "@/config/tuition";
import { readJson, writeJson } from "@/lib/storage";
import { createDefaultCredits } from "@/lib/tuition/plan";

interface StoredState {
  chargeSemesterIndex: number;
  creditsPerSemester: number[];
  includeNssf: boolean;
  includeRegistration: boolean;
  showAllInUsd: boolean;
  usdToLbpRate: number;
}

const EMPTY: StoredState = {
  chargeSemesterIndex: 0,
  creditsPerSemester: createDefaultCredits(),
  includeNssf: true,
  includeRegistration: true,
  showAllInUsd: false,
  usdToLbpRate: 89_000,
};

function read(): StoredState {
  return {
    ...EMPTY,
    ...readJson<Partial<StoredState>>(TUITION_STORAGE_KEY, {}),
  };
}

export function useTuitionCalculatorStorage() {
  const [state, setState] = useState<StoredState | null>(null);

  useEffect(() => setState(read()), []);

  useEffect(() => {
    if (state === null) {
      return;
    }
    writeJson(TUITION_STORAGE_KEY, state);
  }, [state]);

  const setCreditsPerSemester = useCallback(
    (credits: number[]) =>
      setState((previous) => ({
        ...(previous ?? EMPTY),
        creditsPerSemester: credits,
      })),
    []
  );

  const setChargeSemesterIndex = useCallback(
    (index: number) =>
      setState((previous) => ({
        ...(previous ?? EMPTY),
        chargeSemesterIndex: index,
      })),
    []
  );

  const setIncludeNssf = useCallback(
    (checked: boolean) =>
      setState((previous) => ({
        ...(previous ?? EMPTY),
        includeNssf: checked,
      })),
    []
  );

  const setIncludeRegistration = useCallback(
    (checked: boolean) =>
      setState((previous) => ({
        ...(previous ?? EMPTY),
        includeRegistration: checked,
      })),
    []
  );

  const setShowAllInUsd = useCallback(
    (checked: boolean) =>
      setState((previous) => ({
        ...(previous ?? EMPTY),
        showAllInUsd: checked,
      })),
    []
  );

  const setUsdToLbpRate = useCallback(
    (rate: number) =>
      setState((previous) => ({ ...(previous ?? EMPTY), usdToLbpRate: rate })),
    []
  );

  const reset = useCallback(
    () => setState({ ...EMPTY, creditsPerSemester: createDefaultCredits() }),
    []
  );

  return {
    chargeSemesterIndex:
      state?.chargeSemesterIndex ?? EMPTY.chargeSemesterIndex,
    creditsPerSemester: state?.creditsPerSemester ?? EMPTY.creditsPerSemester,
    includeNssf: state?.includeNssf ?? EMPTY.includeNssf,
    includeRegistration:
      state?.includeRegistration ?? EMPTY.includeRegistration,
    reset,
    setChargeSemesterIndex,
    setCreditsPerSemester,
    setIncludeNssf,
    setIncludeRegistration,
    setShowAllInUsd,
    setUsdToLbpRate,
    showAllInUsd: state?.showAllInUsd ?? EMPTY.showAllInUsd,
    usdToLbpRate: state?.usdToLbpRate ?? EMPTY.usdToLbpRate,
  };
}
