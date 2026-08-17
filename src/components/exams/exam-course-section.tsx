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
        <div className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black bg-primary">
          <CourseIcon className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-head text-lg sm:text-xl">
            {group.code}
          </h2>
          <p className="truncate text-muted-foreground text-xs">{group.name}</p>
        </div>
        <span className="shrink-0 text-muted-foreground text-sm">
          {group.total} papers
        </span>
      </div>

      {group.terms.map((term) => (
        <ExamTermGroup group={term} key={term.label} />
      ))}
    </section>
  );
}
