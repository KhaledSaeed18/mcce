import { CurriculumCourseCard } from "@/components/curriculum/curriculum-course-card";
import { Badge } from "@/components/ui/badge";
import { COURSE_CARD_COLORS } from "@/config/courses";
import { getSemesterCredits } from "@/lib/curriculum/credits";
import type { CurriculumSemester } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

interface CurriculumSemesterGroupProps {
  materialsMap: Map<string, CourseSummary>;
  onSelectCourse: (code: string) => void;
  semester: CurriculumSemester;
}

export function CurriculumSemesterGroup({
  materialsMap,
  onSelectCourse,
  semester,
}: CurriculumSemesterGroupProps) {
  const credits = getSemesterCredits(semester);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-head text-lg sm:text-xl">{semester.label}</h3>
        <Badge variant="outline">{credits} credits</Badge>
        <Badge variant="outline">
          {semester.courses.length} course
          {semester.courses.length === 1 ? "" : "s"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {semester.courses.map((course, index) => (
          <CurriculumCourseCard
            color={COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]}
            course={course}
            fileCount={materialsMap.get(course.code)?.fileCount}
            key={course.code}
            onSelect={onSelectCourse}
          />
        ))}
      </div>
    </div>
  );
}
