import { CourseRequirementLinks } from "@/components/course/course-requirement-links";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";

interface CourseRequirementsProps {
  context: CurriculumCourseContext;
  lookup: Map<string, CurriculumCourseContext>;
}

export function CourseRequirements({
  context,
  lookup,
}: CourseRequirementsProps) {
  const { course, semester, year } = context;
  const siblingCodes = semester.courses
    .map((sibling) => sibling.code)
    .filter((code) => code !== course.code);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CourseRequirementLinks
          codes={course.prerequisites}
          label="Prerequisites"
          lookup={lookup}
        />
        <CourseRequirementLinks
          codes={course.corequisites}
          label="Corequisites"
          lookup={lookup}
        />
      </div>
      <CourseRequirementLinks
        codes={siblingCodes}
        label={`Also ${year.label}, ${semester.label}`}
        lookup={lookup}
      />
    </div>
  );
}
