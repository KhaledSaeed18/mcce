import { CurriculumSemesterGroup } from "@/components/curriculum/curriculum-semester-group";
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
  return (
    <div className="flex flex-col gap-8">
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
