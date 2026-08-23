import { Link } from "@tanstack/react-router";
import {
  REQUIREMENT_CHIP_CLASSNAME,
  RequirementChipLabel,
} from "@/components/curriculum/requirement-chip";
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
              className={REQUIREMENT_CHIP_CLASSNAME}
              key={code}
              params={{ code }}
              to="/course/$code"
            >
              <RequirementChipLabel
                code={code}
                name={lookup.get(code)?.course.name}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
