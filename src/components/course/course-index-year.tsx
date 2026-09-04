import { CourseIndexSemester } from "@/components/course/course-index-semester";
import { OpenInDriveButton } from "@/components/drive/open-in-drive-button";
import { findDriveDirectLinksForYear } from "@/config/drive-links";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

interface CourseIndexYearProps {
  materialsMap: Map<string, CourseSummary>;
  year: CurriculumYear;
}

export function CourseIndexYear({ materialsMap, year }: CourseIndexYearProps) {
  const driveLinks = findDriveDirectLinksForYear(year.year);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 pb-2">
        <h2 className="font-head text-xl sm:text-2xl">{year.label}</h2>
        {driveLinks.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2">
            {driveLinks.map((driveLink) => (
              <OpenInDriveButton
                href={driveLink.href}
                key={driveLink.id}
                label={`Open ${driveLink.driveLabel} in Drive`}
              />
            ))}
          </div>
        ) : null}
      </div>

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
