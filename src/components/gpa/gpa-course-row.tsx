import { type ChangeEvent, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MAX_COURSE_AVERAGE } from "@/config/gpa";
import { getQualityPoints, isPassing } from "@/lib/gpa/scale";
import type { GradeEntry } from "@/lib/gpa/types";

interface GpaCourseRowProps {
  entry: GradeEntry;
  onAverageChange: (code: string, average: number | null) => void;
}

export function GpaCourseRow({ entry, onAverageChange }: GpaCourseRowProps) {
  const inputId = `average-${entry.code}`;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      onAverageChange(entry.code, value === "" ? null : Number(value));
    },
    [entry.code, onAverageChange]
  );

  return (
    <div className="border-border/60 flex items-center gap-3 border-b-2 py-2 last:border-b-0">
      <div className="min-w-0 flex-1">
        <label className="block text-sm font-medium" htmlFor={inputId}>
          {entry.code}
        </label>
        <p className="text-muted-foreground truncate text-xs">{entry.name}</p>
      </div>

      <span className="text-muted-foreground shrink-0 text-xs tabular-nums">
        {entry.credits} cr
      </span>

      <Input
        className="w-20 shrink-0 text-right tabular-nums"
        id={inputId}
        inputMode="numeric"
        max={MAX_COURSE_AVERAGE}
        min={0}
        onChange={handleChange}
        placeholder="--"
        type="number"
        value={entry.average ?? ""}
      />

      <div className="w-14 shrink-0">
        {entry.average === null ? null : (
          <Badge
            className="tabular-nums"
            variant={isPassing(entry.average) ? "default" : "destructive"}
          >
            {getQualityPoints(entry.average).toFixed(2)}
          </Badge>
        )}
      </div>
    </div>
  );
}
