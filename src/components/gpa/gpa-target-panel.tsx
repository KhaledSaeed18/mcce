import { type ChangeEvent, useCallback } from "react";
import { GpaTargetOutcome } from "@/components/gpa/gpa-target-outcome";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MAX_QUALITY_POINTS } from "@/config/gpa";
import type { TargetOutcome } from "@/lib/gpa/types";

interface GpaTargetPanelProps {
  onTargetChange: (targetGpa: number) => void;
  outcome: TargetOutcome | null;
  targetGpa: number;
}

export function GpaTargetPanel({
  onTargetChange,
  outcome,
  targetGpa,
}: GpaTargetPanelProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      onTargetChange(Number(event.target.value)),
    [onTargetChange]
  );

  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle>What it takes to hit a target</CardTitle>
        <p className="text-muted-foreground text-sm">
          Every point of a course average counts, so this resolves to a single
          number to aim for rather than a spread of letter grades.
        </p>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <label className="font-medium text-sm" htmlFor="target-gpa">
            Target GPA
          </label>
          <Input
            className="w-24 tabular-nums"
            id="target-gpa"
            inputMode="decimal"
            max={MAX_QUALITY_POINTS}
            min={0}
            onChange={handleChange}
            step={0.05}
            type="number"
            value={targetGpa}
          />
        </div>

        {outcome ? (
          <GpaTargetOutcome outcome={outcome} />
        ) : (
          <p className="text-muted-foreground text-sm">
            Every credit is graded, so there is nothing left to solve for.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
