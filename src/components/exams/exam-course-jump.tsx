import { Link } from "@tanstack/react-router";
import type { ExamCourseGroup } from "@/lib/drive/types";

interface ExamCourseJumpProps {
  groups: ExamCourseGroup[];
}

/** Nine course sections is a long page on a phone, so the codes double as a table of contents. */
export function ExamCourseJump({ groups }: ExamCourseJumpProps) {
  return (
    <nav aria-label="Jump to a course" className="flex flex-wrap gap-2">
      {groups.map((group) => (
        <Link
          className="rounded border-2 px-2 py-1 font-medium text-xs transition hover:bg-primary"
          hash={group.code}
          key={group.code}
          to="/exams"
        >
          {group.code}
          <span className="ml-1 text-muted-foreground">{group.total}</span>
        </Link>
      ))}
    </nav>
  );
}
