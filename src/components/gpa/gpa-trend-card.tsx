import { useCallback, useState } from "react";
import { GpaTrendPlot } from "@/components/gpa/gpa-trend-plot";
import { GpaTrendTable } from "@/components/gpa/gpa-trend-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_WIDTH_PER_POINT,
  GPA_AXIS_TICKS,
  GRADUATION_MIN_GPA,
} from "@/config/gpa";
import { type GpaTrendPoint, toAxisPercent } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";

interface GpaTrendCardProps {
  points: GpaTrendPoint[];
}

export function GpaTrendCard({ points }: GpaTrendCardProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isTable, setIsTable] = useState(false);
  const toggleView = useCallback(() => setIsTable((previous) => !previous), []);

  if (points.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle className="flex items-center justify-between gap-3">
          <span>How your GPA has moved</span>
          <Button onClick={toggleView} size="sm" variant="outline">
            {isTable ? "Chart" : "Table"}
          </Button>
        </CardTitle>
        <dl className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground text-xs">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-xs bg-(--gpa-semester)" />
            <dt>Semester GPA</dt>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3.5 rounded-full bg-(--gpa-cumulative)" />
            <dt>Cumulative GPA</dt>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-0.5 w-3.5 rounded-full bg-muted-foreground" />
            <dt>{formatGpa(GRADUATION_MIN_GPA)} to graduate</dt>
          </div>
        </dl>
      </CardHeader>

      <CardContent>
        {isTable ? (
          <GpaTrendTable points={points} />
        ) : (
          <div
            className="flex gap-2"
            style={{ maxWidth: CHART_WIDTH_PER_POINT * points.length }}
          >
            <div className="relative h-56 w-7 shrink-0">
              {GPA_AXIS_TICKS.map((tick) => (
                <span
                  className="absolute right-0 translate-y-1/2 text-muted-foreground text-xs tabular-nums"
                  key={tick}
                  style={{ bottom: `${toAxisPercent(tick)}%` }}
                >
                  {tick.toFixed(1)}
                </span>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <GpaTrendPlot
                activeIndex={activeIndex}
                onActiveChange={setActiveIndex}
                points={points}
              />
              <div className="mt-2 flex">
                {points.map((point) => (
                  <span
                    className="min-w-0 truncate text-center text-muted-foreground text-xs"
                    key={point.id}
                    style={{ width: `${100 / points.length}%` }}
                  >
                    {point.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
