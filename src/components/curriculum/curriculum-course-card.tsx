import { FolderOpenIcon, InfoIcon } from "lucide-react";
import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  COURSE_KIND_BADGE_LABEL,
  COURSE_REQUIREMENT_CATEGORY_LABEL,
} from "@/config/courses";
import type { CurriculumCourse } from "@/lib/curriculum/types";
import { getCourseIcon } from "@/lib/drive/courses";
import { cn } from "@/lib/utils";

const CARD_CLASSES = cn(
  "flex h-full cursor-pointer flex-col justify-between border-2 text-left shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

interface CurriculumCourseCardProps {
  color: string;
  course: CurriculumCourse;
  fileCount: number | undefined;
  onSelect: (code: string) => void;
}

export function CurriculumCourseCard({
  color,
  course,
  fileCount,
  onSelect,
}: CurriculumCourseCardProps) {
  const Icon = getCourseIcon(course.code, course.name);
  const kindBadgeLabel = COURSE_KIND_BADGE_LABEL[course.kind];
  const requirementCount =
    course.prerequisites.length + course.corequisites.length;
  const handleClick = useCallback(
    () => onSelect(course.code),
    [course.code, onSelect]
  );

  return (
    <button
      className="block w-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      onClick={handleClick}
      type="button"
    >
      <Card className={CARD_CLASSES}>
        <CardHeader>
          <div
            className="flex size-10 items-center justify-center rounded border-2 border-black"
            style={{ backgroundColor: `var(--${color})` }}
          >
            <Icon className="size-5" />
          </div>
          <CardTitle>{course.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{course.code}</Badge>
          <Badge variant="outline">{course.credits} cr</Badge>
          <Badge variant="default">
            {COURSE_REQUIREMENT_CATEGORY_LABEL[course.requirementCategory]}
          </Badge>
          {kindBadgeLabel ? (
            <Badge variant="secondary">{kindBadgeLabel}</Badge>
          ) : null}
          {course.note ? (
            <span className="text-muted-foreground" title={course.note}>
              <InfoIcon className="size-3.5" />
            </span>
          ) : null}
          {requirementCount > 0 && (
            <span className="text-muted-foreground text-xs">
              {requirementCount} requirement{requirementCount === 1 ? "" : "s"}
            </span>
          )}
          <span className="ml-auto flex items-center gap-1 text-muted-foreground text-xs">
            <FolderOpenIcon className="size-3.5" />
            {fileCount ? `${fileCount} files` : "No materials yet"}
          </span>
        </CardContent>
      </Card>
    </button>
  );
}
