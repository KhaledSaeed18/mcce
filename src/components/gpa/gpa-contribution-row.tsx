import { toContributionPercent } from "@/lib/gpa/chart";
import type { CourseContribution } from "@/lib/gpa/contribution";
import { formatContribution } from "@/lib/gpa/standing";

interface GpaContributionRowProps {
  contribution: CourseContribution;
  peak: number;
}

export function GpaContributionRow({
  contribution,
  peak,
}: GpaContributionRowProps) {
  const isLift = contribution.contribution >= 0;
  /** Halved because each bar owns one side of the centre line. */
  const width = toContributionPercent(contribution.contribution, peak) / 2;

  return (
    <li className="flex items-center gap-2">
      <span className="w-16 shrink-0 truncate font-medium text-xs">
        {contribution.code}
      </span>

      <span className="relative flex h-4 min-w-0 flex-1 items-center">
        <span className="sr-only">
          {contribution.name}, {contribution.credits} credits,{" "}
          {formatContribution(contribution.contribution)} GPA points
        </span>
        <span className="absolute inset-y-0 left-1/2 w-px bg-border" />
        <span
          className={
            isLift
              ? "absolute left-1/2 h-2.5 rounded-r-xs bg-(--gpa-cumulative)"
              : "absolute right-1/2 h-2.5 rounded-l-xs bg-destructive"
          }
          style={{ width: `${width}%` }}
        />
      </span>

      <span className="w-14 shrink-0 text-right text-muted-foreground text-xs tabular-nums">
        {formatContribution(contribution.contribution)}
      </span>
    </li>
  );
}
