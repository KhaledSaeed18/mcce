import type { ExamCourseGroup } from "@/lib/drive/types";

interface ExamCourseJumpProps {
  groups: ExamCourseGroup[];
}

/** Nine course sections is a long page on a phone, so the codes double as a table of contents. */
export function ExamCourseJump({ groups }: ExamCourseJumpProps) {
  return (
    <nav aria-label="Jump to a course" className="flex flex-wrap gap-2">
      {groups.map((group) => (
        <a
          className="rounded border-2 px-2 py-1 font-medium text-xs transition hover:bg-primary"
          href={`#${group.code}`}
          key={group.code}
        >
          {group.code}
          <span className="ml-1 text-muted-foreground">{group.total}</span>
        </a>
      ))}
    </nav>
  );
}
