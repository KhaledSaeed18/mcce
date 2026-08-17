import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";

interface CourseRequirementLinksProps {
  codes: string[];
  label: string;
  lookup: Map<string, CurriculumCourseContext>;
}

/**
 * The plan of study opens requirements in a dialog; here they are links, which
 * is what makes the prerequisite chain walkable one page at a time.
 */
export function CourseRequirementLinks({
  codes,
  label,
  lookup,
}: CourseRequirementLinksProps) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <h2 className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </h2>
      {codes.length === 0 ? (
        <p className="text-sm">None</p>
      ) : (
        <div className="flex min-w-0 flex-wrap gap-2">
          {codes.map((code) => (
            <Link
              className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
              key={code}
              params={{ code }}
              to="/course/$code"
            >
              <Badge className="cursor-pointer" variant="outline">
                {code}
                {lookup.get(code) ? `, ${lookup.get(code)?.course.name}` : ""}
              </Badge>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
