import { Link } from "@tanstack/react-router";
import { CurriculumCourseCardBody } from "@/components/curriculum/curriculum-course-card-body";
import type { CurriculumCourse } from "@/lib/curriculum/types";

interface CourseIndexCardProps {
  color: string;
  course: CurriculumCourse;
  fileCount: number | undefined;
}

/** The course list navigates rather than opening a dialog, so its card is a link. */
export function CourseIndexCard({
  color,
  course,
  fileCount,
}: CourseIndexCardProps) {
  return (
    <Link
      aria-label={`${course.name} (${course.code})`}
      className="block w-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      params={{ code: course.code }}
      to="/course/$code"
    >
      <CurriculumCourseCardBody
        color={color}
        course={course}
        fileCount={fileCount}
      />
    </Link>
  );
}
