import { Link } from "@tanstack/react-router";
import { SitemapSectionHeading } from "@/components/sitemap/sitemap-section-heading";
import { CURRICULUM } from "@/config/curriculum";
import { SITEMAP_COURSES_GROUP } from "@/config/sitemap";
import { flattenCourses } from "@/lib/curriculum/lookup";

const COURSE_LINK_CLASSES =
  "flex flex-col gap-0.5 rounded border-2 bg-card px-3 py-2 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-sm";

export function SitemapCourseGroup() {
  const { color, icon, label } = SITEMAP_COURSES_GROUP;

  return (
    <section className="flex flex-col gap-3">
      <SitemapSectionHeading
        color={color}
        count={flattenCourses(CURRICULUM).length}
        icon={icon}
        label={label}
      />

      {CURRICULUM.map((year) => (
        <div className="flex flex-col gap-3" key={year.id}>
          {year.semesters.map((semester) => (
            <div className="flex flex-col gap-2" key={semester.id}>
              <h3 className="text-muted-foreground text-xs uppercase tracking-wide">
                {year.label} · {semester.label}
              </h3>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {semester.courses.map((course) => (
                  <Link
                    className={COURSE_LINK_CLASSES}
                    key={course.code}
                    params={{ code: course.code }}
                    to="/course/$code"
                  >
                    <span className="font-head text-sm">{course.code}</span>
                    <span className="text-muted-foreground text-xs">
                      {course.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
