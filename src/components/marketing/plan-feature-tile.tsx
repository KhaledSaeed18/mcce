import { Link } from "@tanstack/react-router";
import { GraduationCapIcon } from "lucide-react";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { COURSE_CARD_COLORS } from "@/config/courses";
import { CURRICULUM } from "@/config/curriculum";
import { getProgramCredits, getSemesterStops } from "@/lib/curriculum/credits";

const SEMESTER_STOPS = getSemesterStops(CURRICULUM);
const PROGRAM_CREDITS = getProgramCredits(CURRICULUM);

export function PlanFeatureTile() {
  return (
    <Link className="block h-full" to="/plan-of-study">
      <FeatureTile
        color="chart-3"
        description="Every course by year and semester, with credits, prerequisites, and what each one sets out to teach."
        icon={GraduationCapIcon}
        interactive
        linkLabel="See the plan of study"
        title="The full curriculum"
      >
        <ol className="relative flex justify-between gap-1">
          <span
            aria-hidden="true"
            className="absolute top-4 right-4 left-4 border-t-2 border-dashed"
          />

          {SEMESTER_STOPS.map((stop, index) => (
            <li
              className="relative flex flex-1 flex-col items-center gap-1.5"
              key={stop.id}
            >
              <span
                className="flex size-8 items-center justify-center rounded border-2 border-black font-head text-black text-xs tabular-nums"
                style={{
                  backgroundColor: `var(--${COURSE_CARD_COLORS[index % COURSE_CARD_COLORS.length]})`,
                }}
              >
                {stop.credits}
              </span>
              <span className="text-center font-head text-[10px] leading-tight">
                {stop.label}
              </span>
              <span className="text-center text-[10px] text-muted-foreground">
                {stop.courseCount} courses
              </span>
            </li>
          ))}
        </ol>

        <p className="text-muted-foreground text-xs">
          Each marker holds that semester's credit count, {PROGRAM_CREDITS} in
          total.
        </p>
      </FeatureTile>
    </Link>
  );
}
