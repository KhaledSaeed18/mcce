import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCourseIcon } from "@/lib/drive/courses";
import { formatSemesterLabel } from "@/lib/drive/format";
import type { CourseSummary } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

const CARD_CLASSES = cn(
  "flex h-full cursor-pointer flex-col justify-between border-2 shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

interface CourseCardProps {
  color: string;
  course: CourseSummary;
}

export function CourseCard({ color, course }: CourseCardProps) {
  const Icon = getCourseIcon(course.code, course.name);
  const semesterLabel = formatSemesterLabel(course.semester);

  return (
    <Link
      className="block h-full"
      search={{ course: course.code, q: "" }}
      to="/search"
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
          {semesterLabel && <Badge variant="outline">{semesterLabel}</Badge>}
          <span className="text-muted-foreground text-xs">
            {course.fileCount} files
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
