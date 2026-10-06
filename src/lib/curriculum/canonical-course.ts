import { redirect } from "@tanstack/react-router";
import type { FilePreviewSearch } from "@/lib/drive/types";
import { findCourseCode } from "./lookup";
import type { CurriculumCourseContext } from "./types";

/**
 * A permanent redirect folds /course/engg515 and friends into the one URL
 * search engines should index, instead of serving a noindex not-found page.
 */
export function redirectToCanonicalCourse(
  lookup: Map<string, CurriculumCourseContext>,
  code: string,
  search: FilePreviewSearch
): void {
  const canonicalCode = findCourseCode(lookup, code);

  if (canonicalCode && canonicalCode !== code) {
    throw redirect({
      params: { code: canonicalCode },
      search,
      statusCode: 301,
      to: "/course/$code",
    });
  }
}
