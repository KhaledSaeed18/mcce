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
  featured?: boolean;
}

export function CourseCard({
  color,
  course,
  featured = false,
}: CourseCardProps) {
  const Icon = getCourseIcon(course.code, course.name);
  const semesterLabel = formatSemesterLabel(course.semester);

  return (
    <Link
      className={cn(featured && "sm:col-span-2")}
      search={{ course: course.code, q: "" }}
      to="/search"
    >
      <Card className={CARD_CLASSES}>
        <CardHeader>
          <div
            className={cn(
              "flex items-center justify-center rounded border-2 border-black",
              featured ? "size-12" : "size-10"
            )}
            style={{ backgroundColor: `var(--${color})` }}
          >
            <Icon className={featured ? "size-6" : "size-5"} />
          </div>
          <CardTitle className={cn(featured && "text-lg sm:text-xl")}>
            {course.name}
          </CardTitle>
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
