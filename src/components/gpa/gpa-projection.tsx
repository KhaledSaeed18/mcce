import { GpaOutlookTrack } from "@/components/gpa/gpa-outlook-track";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MAX_QUALITY_POINT_AVERAGE, PASSING_AVERAGE } from "@/config/gpa";
import { formatGpa } from "@/lib/gpa/standing";
import type { Projection } from "@/lib/gpa/types";

interface GpaProjectionProps {
  cumulativeGpa: number | null;
  projection: Projection | null;
}

export function GpaProjection({
  cumulativeGpa,
  projection,
}: GpaProjectionProps) {
  if (!projection) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle>Where you can still finish</CardTitle>
        <p className="text-muted-foreground text-sm">
          {projection.creditsRemaining} credits left to grade. Credits already
          graded are locked in, so the ceiling below is the highest final GPA
          still reachable even at {MAX_QUALITY_POINT_AVERAGE} and above on
          everything from here.
        </p>
      </CardHeader>

      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">
            Ceiling, {MAX_QUALITY_POINT_AVERAGE}+ on everything
          </p>
          <p className="font-head text-4xl text-primary tabular-nums">
            {formatGpa(projection.bestCase)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">
            Floor, passing everything at {PASSING_AVERAGE}
          </p>
          <p className="font-head text-4xl tabular-nums">
            {formatGpa(projection.worstCasePassing)}
          </p>
        </div>

        {cumulativeGpa === null ? null : (
          <div className="sm:col-span-2">
            <GpaOutlookTrack
              cumulativeGpa={cumulativeGpa}
              projection={projection}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
