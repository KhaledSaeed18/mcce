import { CourseIndexCard } from "@/components/course/course-index-card";
import { Badge } from "@/components/ui/badge";
import { COURSE_CARD_COLORS } from "@/config/courses";
import { getSemesterCredits } from "@/lib/curriculum/credits";
import type { CurriculumSemester } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

interface CourseIndexSemesterProps {
  materialsMap: Map<string, CourseSummary>;
  semester: CurriculumSemester;
}

export function CourseIndexSemester({
  materialsMap,
  semester,
}: CourseIndexSemesterProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-head text-lg">{semester.label}</h3>
        <Badge variant="outline">{getSemesterCredits(semester)} credits</Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {semester.courses.map((course, index) => (
          <CourseIndexCard
            color={COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]}
            course={course}
            fileCount={materialsMap.get(course.code)?.fileCount}
            key={course.code}
          />
        ))}
      </div>
    </div>
  );
}
