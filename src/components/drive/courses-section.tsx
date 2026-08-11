import { CourseCard } from "@/components/drive/course-card";
import { COURSE_CARD_COLORS } from "@/config/courses";
import type { CourseSummary } from "@/lib/drive/types";

interface CoursesSectionProps {
  courses: CourseSummary[];
}

export function CoursesSection({ courses }: CoursesSectionProps) {
  if (courses.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6" id="courses">
      <div className="flex flex-col gap-1">
        <h2 className="font-head text-2xl sm:text-3xl">Courses</h2>
        <p className="text-muted-foreground text-sm">
          Jump straight to a course's materials.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, index) => (
          <CourseCard
            color={COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]}
            course={course}
            featured={index === 0}
            key={course.code}
          />
        ))}
      </div>
    </section>
  );
}
