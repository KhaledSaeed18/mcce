const COURSE_CODE_PARTS = /^([A-Z]+)(\d.*)$/u;

/** Students often type a space, as in "ENGG 515", so pages name both forms. */
export function formatSpacedCourseCode(code: string): string {
  return code.replace(COURSE_CODE_PARTS, "$1 $2");
}
