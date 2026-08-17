import { GpaContributionRow } from "@/components/gpa/gpa-contribution-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPeakContribution } from "@/lib/gpa/chart";
import type { CourseContribution } from "@/lib/gpa/contribution";

interface GpaContributionCardProps {
  contributions: CourseContribution[];
}

export function GpaContributionCard({
  contributions,
}: GpaContributionCardProps) {
  if (contributions.length === 0) {
    return null;
  }

  const peak = getPeakContribution(contributions);

  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle>What is moving your GPA</CardTitle>
        <p className="text-muted-foreground text-sm">
          Every graded course against your cumulative GPA, weighted by credits.
          Bars to the right pull it up, bars to the left pull it down, and the
          two sides cancel out.
        </p>
      </CardHeader>

      <CardContent>
        <ul className="flex flex-col gap-1.5">
          {contributions.map((contribution) => (
            <GpaContributionRow
              contribution={contribution}
              key={contribution.code}
              peak={peak}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
