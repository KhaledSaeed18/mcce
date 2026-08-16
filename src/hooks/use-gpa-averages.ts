import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_TARGET_GPA,
  GPA_STORAGE_KEY,
  MAX_COURSE_AVERAGE,
} from "@/config/gpa";
import type { AverageMap } from "@/lib/gpa/entries";

interface StoredState {
  averages: AverageMap;
  targetGpa: number;
}

const EMPTY: StoredState = { averages: {}, targetGpa: DEFAULT_TARGET_GPA };

function read(): StoredState {
  try {
    const raw = localStorage.getItem(GPA_STORAGE_KEY);

    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

/**
 * Null means "storage not read yet", which keeps the first render identical on
 * the server and the client for hydration, and stops the save effect from
 * writing the empty initial state over real grades before the load lands.
 */
export function useGpaAverages() {
  const [state, setState] = useState<StoredState | null>(null);

  useEffect(() => setState(read()), []);

  useEffect(() => {
    if (state === null) {
      return;
    }
    localStorage.setItem(GPA_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setAverage = useCallback((code: string, average: number | null) => {
    const clamped =
      average === null
        ? null
        : Math.min(Math.max(average, 0), MAX_COURSE_AVERAGE);

    setState((previous) => {
      const base = previous ?? EMPTY;

      return { ...base, averages: { ...base.averages, [code]: clamped } };
    });
  }, []);

  const setTargetGpa = useCallback(
    (targetGpa: number) =>
      setState((previous) => ({ ...(previous ?? EMPTY), targetGpa })),
    []
  );

  const reset = useCallback(() => setState({ ...EMPTY, averages: {} }), []);

  return {
    averages: state?.averages ?? EMPTY.averages,
    reset,
    setAverage,
    setTargetGpa,
    targetGpa: state?.targetGpa ?? EMPTY.targetGpa,
  };
}
