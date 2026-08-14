import { CurriculumSemesterGroup } from "@/components/curriculum/curriculum-semester-group";
import { Badge } from "@/components/ui/badge";
import { getYearCredits } from "@/lib/curriculum/credits";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

interface CurriculumYearPanelProps {
  materialsMap: Map<string, CourseSummary>;
  onSelectCourse: (code: string) => void;
  year: CurriculumYear;
}

export function CurriculumYearPanel({
  materialsMap,
  onSelectCourse,
  year,
}: CurriculumYearPanelProps) {
  const credits = getYearCredits(year);
  const courseCount = year.semesters.reduce(
    (total, semester) => total + semester.courses.length,
    0
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="font-head text-2xl sm:text-3xl">{year.label}</h2>
        <Badge variant="outline">{credits} credits</Badge>
        <Badge variant="outline">
          {courseCount} course{courseCount === 1 ? "" : "s"}
        </Badge>
      </div>

      {year.semesters.map((semester) => (
        <CurriculumSemesterGroup
          key={semester.id}
          materialsMap={materialsMap}
          onSelectCourse={onSelectCourse}
          semester={semester}
        />
      ))}
    </div>
  );
}
