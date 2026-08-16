import { GpaTrendBand } from "@/components/gpa/gpa-trend-band";
import { GpaTrendTooltip } from "@/components/gpa/gpa-trend-tooltip";
import { GPA_AXIS_TICKS, GRADUATION_MIN_GPA } from "@/config/gpa";
import { type GpaTrendPoint, toAxisPercent } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";

interface GpaTrendPlotProps {
  activeIndex: number | null;
  onActiveChange: (index: number | null) => void;
  points: GpaTrendPoint[];
}

/** Centre of a point's band, so the bars and the line share one x position. */
function bandCentre(index: number, total: number): number {
  return ((index + 0.5) / total) * 100;
}

export function GpaTrendPlot({
  activeIndex,
  onActiveChange,
  points,
}: GpaTrendPlotProps) {
  const total = points.length;
  const last = points[total - 1];
  const linePoints = points
    .map(
      (point, index) =>
        `${bandCentre(index, total)},${100 - toAxisPercent(point.cumulativeGpa)}`
    )
    .join(" ");

  return (
    <div className="relative h-56">
      {GPA_AXIS_TICKS.map((tick) => (
        <div
          className={
            tick === GRADUATION_MIN_GPA
              ? "absolute inset-x-0 border-muted-foreground border-t"
              : "absolute inset-x-0 border-border/25 border-t"
          }
          key={tick}
          style={{ bottom: `${toAxisPercent(tick)}%` }}
        />
      ))}

      {points.map((point, index) => (
        <GpaTrendBand
          index={index}
          isDimmed={activeIndex !== null && activeIndex !== index}
          key={point.id}
          onActivate={onActiveChange}
          point={point}
          total={total}
        />
      ))}

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <polyline
          fill="none"
          points={linePoints}
          stroke="var(--gpa-cumulative)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {points.map((point, index) => (
        <span
          className="pointer-events-none absolute size-2.5 rounded-full bg-(--gpa-cumulative) ring-2 ring-card"
          key={point.id}
          style={{
            bottom: `${toAxisPercent(point.cumulativeGpa)}%`,
            left: `${bandCentre(index, total)}%`,
            transform: "translate(-50%, 50%)",
          }}
        />
      ))}

      {activeIndex === null ? (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-2 font-medium text-xs tabular-nums"
          style={{
            bottom: `${toAxisPercent(last.cumulativeGpa)}%`,
            left: `${bandCentre(total - 1, total)}%`,
          }}
        >
          {formatGpa(last.cumulativeGpa)}
        </span>
      ) : (
        <GpaTrendTooltip
          centre={bandCentre(activeIndex, total)}
          point={points[activeIndex]}
        />
      )}
    </div>
  );
}
