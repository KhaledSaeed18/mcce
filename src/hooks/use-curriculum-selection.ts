import { useCallback } from "react";

interface CurriculumSelectionSearch {
  course?: string;
}

interface UseCurriculumSelectionArgs {
  navigate: (opts: {
    search: (prev: CurriculumSelectionSearch) => CurriculumSelectionSearch;
  }) => void;
}

/** Drives the plan-of-study course dialog off the `course` URL search param, so a selection is a shareable link. */
export function useCurriculumSelection({
  navigate,
}: UseCurriculumSelectionArgs) {
  const selectCourse = useCallback(
    (code: string) =>
      navigate({ search: (prev) => ({ ...prev, course: code }) }),
    [navigate]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        navigate({ search: (prev) => ({ ...prev, course: undefined }) });
      }
    },
    [navigate]
  );

  return { handleOpenChange, selectCourse };
}
