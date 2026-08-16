import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GRADUATION_MIN_GPA, MCCE_DEGREE_CREDITS } from "@/config/gpa";
import { canGraduate, formatGpa, getStanding } from "@/lib/gpa/standing";
import type { GpaTotals } from "@/lib/gpa/types";

interface GpaStandingSummaryProps {
  cumulative: GpaTotals;
}

export function GpaStandingSummary({ cumulative }: GpaStandingSummaryProps) {
  if (cumulative.gpa === null) {
    return (
      <Card>
        <CardContent className="text-muted-foreground text-sm">
          Enter at least one course average to see your cumulative GPA and
          academic standing.
        </CardContent>
      </Card>
    );
  }

  const standing = getStanding(cumulative.gpa);
  const meetsGraduation = canGraduate(cumulative.gpa);

  return (
    <Card>
      <CardContent className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">
            Cumulative GPA
          </p>
          <p className="font-head text-5xl tabular-nums">
            {formatGpa(cumulative.gpa)}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">
            Credits graded
          </p>
          <p className="font-head text-2xl tabular-nums">
            {cumulative.credits} / {MCCE_DEGREE_CREDITS}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs uppercase tracking-wide">
            Quality points
          </p>
          <p className="font-head text-2xl tabular-nums">
            {cumulative.qualityPoints.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col items-start gap-1.5">
          <Badge
            variant={standing.tone === "probation" ? "destructive" : "default"}
          >
            {standing.label}
          </Badge>
          <p className="text-muted-foreground text-xs">
            {meetsGraduation
              ? `At or above the ${formatGpa(GRADUATION_MIN_GPA)} needed to graduate`
              : `Below the ${formatGpa(GRADUATION_MIN_GPA)} needed to graduate`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
