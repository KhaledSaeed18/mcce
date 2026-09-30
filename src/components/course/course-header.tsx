import { InfoIcon } from "lucide-react";
import { OpenInDriveButton } from "@/components/drive/open-in-drive-button";
import { Badge } from "@/components/ui/badge";
import {
  COURSE_KIND_BADGE_LABEL,
  COURSE_REQUIREMENT_CATEGORY_LABEL,
} from "@/config/courses";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";
import { getCourseIcon } from "@/lib/drive/courses";
import { buildDriveFolderUrl } from "@/lib/drive/urls";

interface CourseHeaderProps {
  context: CurriculumCourseContext;
  folderId: string | null;
}

export function CourseHeader({ context, folderId }: CourseHeaderProps) {
  const { course, semester, year } = context;
  const Icon = getCourseIcon(course.code, course.name);
  const kindBadgeLabel = COURSE_KIND_BADGE_LABEL[course.kind];

  return (
    <header className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded border-2 border-black bg-primary">
            <Icon className="size-5" />
          </div>
          <h1 className="font-head text-xl sm:text-2xl">{course.name}</h1>
        </div>
        {folderId ? (
          <OpenInDriveButton href={buildDriveFolderUrl(folderId)} />
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">{course.code}</Badge>
        <Badge variant="outline">{course.credits} cr</Badge>
        <Badge variant="default">
          {COURSE_REQUIREMENT_CATEGORY_LABEL[course.requirementCategory]}
        </Badge>
        {kindBadgeLabel ? (
          <Badge variant="secondary">{kindBadgeLabel}</Badge>
        ) : null}
        <Badge variant="outline">
          {year.label}, {semester.label}
        </Badge>
      </div>

      <p className="text-sm">
        {course.description ?? "No description available yet."}
      </p>

      {course.note ? (
        <p className="flex items-start gap-2 rounded border-2 bg-muted/50 p-3 text-sm">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          {course.note}
        </p>
      ) : null}
    </header>
  );
}
