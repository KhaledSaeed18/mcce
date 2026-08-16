import { GPA_AXIS_TICKS, GRADUATION_MIN_GPA } from "@/config/gpa";
import { toAxisPercent } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";
import type { Projection } from "@/lib/gpa/types";

interface GpaOutlookTrackProps {
  cumulativeGpa: number;
  projection: Projection;
}

/**
 * A needle gauge shows only where you are. The band shows where you can still
 * end up, which is the part a student can act on.
 */
export function GpaOutlookTrack({
  cumulativeGpa,
  projection,
}: GpaOutlookTrackProps) {
  const floor = toAxisPercent(projection.worstCasePassing);
  const ceiling = toAxisPercent(projection.bestCase);

  return (
    <div className="flex flex-col gap-1">
      <div className="relative h-8 rounded border-2 bg-muted">
        <div
          className="absolute inset-y-0 bg-(--gpa-cumulative)/25"
          style={{ left: `${floor}%`, width: `${ceiling - floor}%` }}
        />
        <div
          className="absolute inset-y-0 border-muted-foreground border-l-2"
          style={{ left: `${toAxisPercent(GRADUATION_MIN_GPA)}%` }}
        />
        <div
          className="absolute inset-y-0 w-1 -translate-x-1/2 rounded-full bg-(--gpa-cumulative) ring-2 ring-card"
          style={{ left: `${toAxisPercent(cumulativeGpa)}%` }}
        />
      </div>

      <div className="relative h-4">
        {GPA_AXIS_TICKS.map((tick) => (
          <span
            className="absolute -translate-x-1/2 text-muted-foreground text-xs tabular-nums"
            key={tick}
            style={{ left: `${toAxisPercent(tick)}%` }}
          >
            {tick}
          </span>
        ))}
      </div>

      <p className="text-muted-foreground text-xs">
        Now at {formatGpa(cumulativeGpa)}. Everything from{" "}
        {formatGpa(projection.worstCasePassing)} to{" "}
        {formatGpa(projection.bestCase)} is still open, and the mark at{" "}
        {formatGpa(GRADUATION_MIN_GPA)} is the line to graduate.
      </p>
    </div>
  );
}
