import { useCallback, useState } from "react";

/** Tracks which course code is open in the plan-of-study detail dialog. */
export function useCurriculumSelection() {
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const selectCourse = useCallback((code: string) => setSelectedCode(code), []);

  const handleOpenChange = useCallback((open: boolean) => {
    if (!open) {
      setSelectedCode(null);
    }
  }, []);

  return { handleOpenChange, selectCourse, selectedCode };
}
