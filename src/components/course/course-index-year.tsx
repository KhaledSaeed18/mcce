import { CourseIndexSemester } from "@/components/course/course-index-semester";
import { OpenInDriveButton } from "@/components/drive/open-in-drive-button";
import { findDriveDirectLinkForYear } from "@/config/drive-links";
import type { CurriculumYear } from "@/lib/curriculum/types";
import type { CourseSummary } from "@/lib/drive/types";

interface CourseIndexYearProps {
  materialsMap: Map<string, CourseSummary>;
  year: CurriculumYear;
}

export function CourseIndexYear({ materialsMap, year }: CourseIndexYearProps) {
  const driveLink = findDriveDirectLinkForYear(year.year);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 pb-2">
        <h2 className="font-head text-xl sm:text-2xl">{year.label}</h2>
        {driveLink ? (
          <OpenInDriveButton
            href={driveLink.href}
            label={`Open ${driveLink.driveLabel} in Drive`}
          />
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
