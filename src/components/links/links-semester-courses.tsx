import { Link } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";
import { formatCount } from "@/lib/drive/format";
import { formatSemesterFolderLabel } from "@/lib/drive/semester-folders";
import type { SemesterFolder } from "@/lib/drive/types";

interface LinksSemesterCoursesProps {
  color: string;
  folder: SemesterFolder;
}

export function LinksSemesterCourses({
  color,
  folder,
}: LinksSemesterCoursesProps) {
  return (
    <details className="group bg-card rounded border-2 shadow-sm">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 px-2.5 py-2 text-sm font-medium [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden="true"
          className="size-3 shrink-0 rounded-sm border-2 border-black"
          style={{ backgroundColor: `var(--${color})` }}
        />
        <span className="min-w-0 flex-1">
          {formatSemesterFolderLabel(folder)}
        </span>
        <span className="text-muted-foreground shrink-0 text-xs">
          {formatCount(folder.courses.length, "course")}
        </span>
        <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
      </summary>

      <ul className="flex flex-col gap-0.5 border-t-2 p-1.5">
        {folder.courses.map((course) => (
          <li key={course.code}>
            <Link
              className="hover:bg-accent flex min-h-9 flex-wrap items-baseline gap-x-2 rounded px-1.5 py-1.5 text-sm leading-tight transition-colors duration-200"
              params={{ code: course.code }}
              to="/course/$code"
            >
              <span className="font-head text-xs">{course.code}</span>
              <span className="text-muted-foreground">{course.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
