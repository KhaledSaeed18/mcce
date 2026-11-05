import { Link } from "@tanstack/react-router";
import { ExamTermGroup } from "@/components/exams/exam-term-group";
import { getCourseIcon } from "@/lib/drive/courses";
import type { ExamCourseGroup } from "@/lib/drive/types";

interface ExamCourseSectionProps {
  group: ExamCourseGroup;
}

export function ExamCourseSection({ group }: ExamCourseSectionProps) {
  const CourseIcon = getCourseIcon(group.code, group.name);

  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id={group.code}>
      <div className="flex items-center gap-3 border-b-2 pb-2">
        <div className="bg-primary flex size-8 shrink-0 items-center justify-center rounded border-2 border-black">
          <CourseIcon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-head truncate text-lg sm:text-xl">
            <Link
              className="underline-offset-2 hover:underline"
              params={{ code: group.code }}
              to="/course/$code"
            >
              {group.code}
            </Link>
          </h2>
          <p className="text-muted-foreground truncate text-xs">{group.name}</p>
        </div>
        <span className="text-muted-foreground shrink-0 text-sm">
          {group.total} papers
        </span>
      </div>

      {group.terms.map((term) => (
        <ExamTermGroup group={term} key={term.label} />
      ))}
    </section>
  );
}
