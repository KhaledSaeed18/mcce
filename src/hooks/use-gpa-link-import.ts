import { useCallback, useMemo } from "react";
import { CURRICULUM } from "@/config/curriculum";
import { GPA_SHARE_PARAM } from "@/config/gpa";
import { flattenCourses } from "@/lib/curriculum/lookup";
import type { AverageMap } from "@/lib/gpa/entries";
import { decodeShareValue, toAverageMap } from "@/lib/gpa/share/decode";
import type { GpaShareSearch } from "@/lib/gpa/share/search";

const COURSES = flattenCourses(CURRICULUM);

interface UseGpaLinkImportArgs {
  navigate: (opts: { replace: boolean; search: GpaShareSearch }) => void;
  onApply: (averages: AverageMap) => void;
  value: string | undefined;
}

/**
 * Reads a shared set of averages off the URL once and hands it to a confirm
 * step. The param is stripped either way, so the link never re-applies on a
 * back navigation and typing does not push a new history entry per keystroke.
 */
export function useGpaLinkImport({
  navigate,
  onApply,
  value,
}: UseGpaLinkImportArgs) {
  const grades = useMemo(
    () => (value === undefined ? [] : decodeShareValue(value, COURSES)),
    [value]
  );

  const dismiss = useCallback(
    () => navigate({ replace: true, search: { [GPA_SHARE_PARAM]: undefined } }),
    [navigate]
  );

  const apply = useCallback(() => {
    onApply(toAverageMap(grades));
    dismiss();
  }, [dismiss, grades, onApply]);

  return { apply, dismiss, grades, hasLink: value !== undefined };
}
