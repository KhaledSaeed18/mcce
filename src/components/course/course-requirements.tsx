import { CourseRequirementLinks } from "@/components/course/course-requirement-links";
import type {
  CurriculumCourse,
  CurriculumCourseContext,
} from "@/lib/curriculum/types";

interface CourseRequirementsProps {
  course: CurriculumCourse;
  lookup: Map<string, CurriculumCourseContext>;
}

export function CourseRequirements({
  course,
  lookup,
}: CourseRequirementsProps) {
  return (
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
  );
}
