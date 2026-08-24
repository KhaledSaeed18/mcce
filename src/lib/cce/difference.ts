import { getCceCourse, getProgramCourseCodes } from "@/lib/cce/lookup";
import type { CceCourse, CceProgram } from "@/lib/cce/types";

export interface CceProgramDifference {
  /** Courses only the computer engineering track sits. */
  cengOnly: CceCourse[];
  sharedCount: number;
  /** Courses only the communications engineering track sits. */
  tengOnly: CceCourse[];
}

function resolve(codes: string[]): CceCourse[] {
  return codes.flatMap((code) => {
    const course = getCceCourse(code);
    return course ? [course] : [];
  });
}

/** What actually separates the two tracks once the never-opened elective is set aside. */
export function getCceProgramDifference(
  ceng: CceProgram,
  teng: CceProgram
): CceProgramDifference {
  const cengCodes = new Set(getProgramCourseCodes(ceng));
  const tengCodes = new Set(getProgramCourseCodes(teng));

  return {
    cengOnly: resolve([...cengCodes].filter((code) => !tengCodes.has(code))),
    sharedCount: [...cengCodes].filter((code) => tengCodes.has(code)).length,
    tengOnly: resolve([...tengCodes].filter((code) => !cengCodes.has(code))),
  };
}
