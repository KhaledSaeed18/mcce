import { describe, expect, it } from "vitest";
import {
  CCE_PROGRAMS,
  CENG_PROGRAM,
  TENG_PROGRAM,
} from "@/config/cce/programs";
import { getCceCourseCount, getCcePlanCredits } from "@/lib/cce/credits";
import { getCceProgramDifference } from "@/lib/cce/difference";
import { getCceCourse, getProgramCourseCodes } from "@/lib/cce/lookup";

describe("cce programs", () => {
  it.each(CCE_PROGRAMS)(
    "$abbreviation plan of study totals the published credits",
    (program) => {
      expect(getCcePlanCredits(program.plan)).toBe(program.credits);
    }
  );

  it.each(CCE_PROGRAMS)(
    "$abbreviation requirement blocks total the published credits",
    (program) => {
      const total = program.requirements.reduce(
        (sum, block) => sum + block.credits,
        0
      );

      expect(total).toBe(program.credits);
    }
  );

  it.each(CCE_PROGRAMS)(
    "$abbreviation references only courses in the catalog",
    (program) => {
      const missing = getProgramCourseCodes(program).filter(
        (code) => !getCceCourse(code)
      );

      expect(missing).toEqual([]);
    }
  );

  it("separates the two tracks by exactly one course", () => {
    const difference = getCceProgramDifference(CENG_PROGRAM, TENG_PROGRAM);

    expect(difference.cengOnly.map((course) => course.code)).toEqual([
      "CENG470",
    ]);
    expect(difference.tengOnly.map((course) => course.code)).toEqual([
      "EENG388",
    ]);
    expect(difference.sharedCount).toBe(getCceCourseCount(CENG_PROGRAM) - 1);
  });
});
