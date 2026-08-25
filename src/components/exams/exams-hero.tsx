import { ExamCourseJump } from "@/components/exams/exam-course-jump";
import { ExamPapersMark } from "@/components/exams/exam-papers-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import type { ExamCourseGroup } from "@/lib/drive/types";

interface ExamsHeroProps {
  groups: ExamCourseGroup[];
}

export function ExamsHero({ groups }: ExamsHeroProps) {
  const total = groups.reduce((sum, group) => sum + group.total, 0);

  return (
    <PageHero
      badge="PAST EXAMS"
      decoration={
        <PageHeroMotion width="w-32">
          <ExamPapersMark />
        </PageHeroMotion>
      }
      description={`${total} papers across ${groups.length} courses, newest term first. Papers whose name records no year are grouped at the end of each course.`}
      highlight="grouped by term."
      title="Every past paper,"
    >
      <ExamCourseJump groups={groups} />
    </PageHero>
  );
}
