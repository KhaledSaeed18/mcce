import { MAX_COURSE_AVERAGE, MAX_QUALITY_POINTS } from "@/config/gpa";
import { formatGpa } from "@/lib/gpa/standing";
import type { TargetOutcome } from "@/lib/gpa/types";

interface GpaTargetOutcomeProps {
  outcome: TargetOutcome;
}

export function GpaTargetOutcome({ outcome }: GpaTargetOutcomeProps) {
  if (outcome.kind === "impossible") {
    return (
      <p className="text-sm">
        Out of reach. It would take an average of{" "}
        <strong className="tabular-nums">
          {outcome.requiredAverage.toFixed(1)}
        </strong>{" "}
        across every remaining credit, and {MAX_COURSE_AVERAGE} is the highest
        average there is. Anything at or above 90 is worth the same{" "}
        {formatGpa(MAX_QUALITY_POINTS)}, so the extra points cannot be made up.
      </p>
    );
  }

  if (outcome.kind === "guaranteed") {
    return (
      <p className="text-sm">
        Already locked in. Passing every remaining course lands you at or above
        this target.
      </p>
    );
  }

  return (
    <p className="text-sm">
      Average{" "}
      <strong className="tabular-nums">
        {outcome.requiredAverage.toFixed(1)}
      </strong>{" "}
      across your remaining credits, which is{" "}
      <span className="tabular-nums">
        {formatGpa(outcome.requiredAverageQpt)}
      </span>{" "}
      quality points per credit.
    </p>
  );
}
