import { useCallback } from "react";
import { CHART_BAR_MAX_WIDTH } from "@/config/gpa";
import { type GpaTrendPoint, toAxisPercent } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";

interface GpaTrendBandProps {
  index: number;
  isDimmed: boolean;
  onActivate: (index: number | null) => void;
  point: GpaTrendPoint;
  total: number;
}

/**
 * The full-height column is the hit target, not the bar, so a short semester is
 * as easy to hover as a tall one.
 */
export function GpaTrendBand({
  index,
  isDimmed,
  onActivate,
  point,
  total,
}: GpaTrendBandProps) {
  const handleEnter = useCallback(() => onActivate(index), [index, onActivate]);
  const handleLeave = useCallback(() => onActivate(null), [onActivate]);

  return (
    <button
      className="absolute inset-y-0 flex items-end justify-center rounded-none outline-offset-2"
      onBlur={handleLeave}
      onFocus={handleEnter}
      onMouseEnter={handleEnter}
      style={{
        left: `${(index / total) * 100}%`,
        width: `${100 / total}%`,
      }}
      type="button"
    >
      <span className="sr-only">
        {point.label}: semester {formatGpa(point.semesterGpa)}, cumulative{" "}
        {formatGpa(point.cumulativeGpa)}
      </span>
      <span
        className="w-1/2 rounded-t bg-(--gpa-semester) transition-opacity"
        style={{
          height: `${toAxisPercent(point.semesterGpa)}%`,
          maxWidth: CHART_BAR_MAX_WIDTH,
          opacity: isDimmed ? 0.5 : 1,
        }}
      />
    </button>
  );
}
