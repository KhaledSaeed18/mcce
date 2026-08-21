import { useCallback } from "react";
import { CurriculumCourseCardBody } from "@/components/curriculum/curriculum-course-card-body";
import type { CurriculumCourse } from "@/lib/curriculum/types";

interface CurriculumCourseCardProps {
  color: string;
  course: CurriculumCourse;
  fileCount: number | undefined;
  onSelect: (code: string) => void;
}

/** The plan of study opens a course in a dialog, so its card is a button. */
export function CurriculumCourseCard({
  color,
  course,
  fileCount,
  onSelect,
}: CurriculumCourseCardProps) {
  const handleClick = useCallback(
    () => onSelect(course.code),
    [course.code, onSelect]
  );

  return (
    <button
      aria-label={`Open ${course.code}, ${course.name}`}
      className="block w-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      onClick={handleClick}
      type="button"
    >
      <CurriculumCourseCardBody
        color={color}
        course={course}
        fileCount={fileCount}
      />
    </button>
  );
}
