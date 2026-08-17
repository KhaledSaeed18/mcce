import { CourseIndexSemester } from "@/components/course/course-index-semester";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

interface CourseIndexYearProps {
  materialsMap: Map<string, CourseSummary>;
  year: CurriculumYear;
}

export function CourseIndexYear({ materialsMap, year }: CourseIndexYearProps) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="border-b-2 pb-2 font-head text-xl sm:text-2xl">
        {year.label}
      </h2>

      {year.semesters.map((semester) => (
        <CourseIndexSemester
          key={semester.id}
          materialsMap={materialsMap}
          semester={semester}
        />
      ))}
    </section>
  );
}
