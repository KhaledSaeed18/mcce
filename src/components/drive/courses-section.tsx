import { m } from "motion/react";
import { CourseCard } from "@/components/drive/course-card";
import { COURSE_CARD_COLORS } from "@/config/courses";
import { useReveal } from "@/hooks/use-reveal";
import type { CourseSummary } from "@/lib/drive/types";

interface CoursesSectionProps {
  courses: CourseSummary[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  const reveal = useReveal();

  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6" id="courses">
      <m.div className="flex flex-col gap-1" {...reveal.single}>
        <h2 className="font-head text-2xl sm:text-3xl">Courses</h2>
        <p className="text-muted-foreground text-sm">
          Jump straight to a course's materials.
        </p>
      </m.div>

      <m.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        {...reveal.group}
      >
        {courses.map((course, index) => (
          <m.div className="h-full" key={course.code} {...reveal.item}>
            <CourseCard
              color={COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]}
              course={course}
            />
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
