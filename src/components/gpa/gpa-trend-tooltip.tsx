import { type GpaTrendPoint, toAxisPercent } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";

interface GpaTrendTooltipProps {
  centre: number;
  point: GpaTrendPoint;
}

export function GpaTrendTooltip({ centre, point }: GpaTrendTooltipProps) {
  const anchorRight = centre > 60;

  return (
    <div
      className="pointer-events-none absolute z-10 w-max rounded border-2 bg-card p-2 shadow-md"
      style={{
        bottom: `${Math.min(toAxisPercent(point.cumulativeGpa) + 8, 70)}%`,
        left: anchorRight ? undefined : `${centre}%`,
        right: anchorRight ? `${100 - centre}%` : undefined,
      }}
    >
      <p className="font-medium text-xs">{point.label}</p>
      <dl className="mt-1 grid grid-cols-[auto_auto] gap-x-3 text-xs">
        <dt className="text-muted-foreground">Semester</dt>
        <dd className="text-right tabular-nums">
          {formatGpa(point.semesterGpa)}
        </dd>
        <dt className="text-muted-foreground">Cumulative</dt>
        <dd className="text-right tabular-nums">
          {formatGpa(point.cumulativeGpa)}
        </dd>
        <dt className="text-muted-foreground">Credits</dt>
        <dd className="text-right tabular-nums">{point.credits}</dd>
      </dl>
    </div>
  );
}
