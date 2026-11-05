import { Link } from "@tanstack/react-router";
import { CalculatorIcon } from "lucide-react";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { GPA_PREVIEW_POINTS } from "@/config/features";
import { GRADUATION_MIN_GPA, MAX_QUALITY_POINTS } from "@/config/gpa";

const MINIMUM_LINE_OFFSET = `${(GRADUATION_MIN_GPA / MAX_QUALITY_POINTS) * 100}%`;

export function GpaFeatureTile() {
  return (
    <Link className="block h-full" to="/gpa-calculator">
      <FeatureTile
        color="chart-5"
        description="Type a course average, get semester and cumulative GPA on the LIU scale, plus the average you still need for a target. Grades never leave the device."
        icon={CalculatorIcon}
        interactive
        linkLabel="Open calculator"
        title="Work out your GPA"
      >
        <div className="flex flex-col gap-2">
          <div className="relative flex h-24 items-end gap-2">
            <span
              aria-hidden="true"
              className="border-muted-foreground absolute inset-x-0 border-t-2 border-dashed"
              style={{ bottom: MINIMUM_LINE_OFFSET }}
            />

            {GPA_PREVIEW_POINTS.map((point) => (
              <div
                className="flex h-full flex-1 flex-col justify-end gap-1"
                key={point.label}
              >
                <span className="font-head text-center text-[10px] tabular-nums">
                  {point.gpa.toFixed(2)}
                </span>
                <div
                  className="w-full rounded-t-sm border-2 bg-(--gpa-semester)"
                  style={{
                    height: `${(point.gpa / MAX_QUALITY_POINTS) * 100}%`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            {GPA_PREVIEW_POINTS.map((point) => (
              <span
                className="text-muted-foreground flex-1 text-center text-[10px]"
                key={point.label}
              >
                {point.label}
              </span>
            ))}
          </div>
        </div>
      </FeatureTile>
    </Link>
  );
}
