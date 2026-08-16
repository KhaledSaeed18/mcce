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
 * Starts empty on both server and first client render so hydration matches,
 * then loads from storage in an effect.
 */
export function useGpaAverages() {
  const [state, setState] = useState<StoredState>(EMPTY);

  useEffect(() => setState(read()), []);

  useEffect(() => {
    localStorage.setItem(GPA_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setAverage = useCallback((code: string, average: number | null) => {
    const clamped =
      average === null
        ? null
        : Math.min(Math.max(average, 0), MAX_COURSE_AVERAGE);

    setState((prev) => ({
      ...prev,
      averages: { ...prev.averages, [code]: clamped },
    }));
  }, []);

  const setTargetGpa = useCallback(
    (targetGpa: number) => setState((prev) => ({ ...prev, targetGpa })),
    []
  );

  const reset = useCallback(() => setState(EMPTY), []);

  return {
    averages: state.averages,
    reset,
    setAverage,
    setTargetGpa,
    targetGpa: state.targetGpa,
  };
}
