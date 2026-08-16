import { GpaCourseRow } from "@/components/gpa/gpa-course-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GpaSemester } from "@/lib/gpa/entries";
import { formatGpa } from "@/lib/gpa/standing";
import type { GpaTotals } from "@/lib/gpa/types";

interface GpaSemesterCardProps {
  onAverageChange: (code: string, average: number | null) => void;
  semester: GpaSemester;
  totals: GpaTotals;
}

export function GpaSemesterCard({
  onAverageChange,
  semester,
  totals,
}: GpaSemesterCardProps) {
  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle className="flex items-baseline justify-between gap-3">
          <span>{semester.label}</span>
          <span className="font-head text-2xl tabular-nums">
            {totals.gpa === null ? "--" : formatGpa(totals.gpa)}
          </span>
        </CardTitle>
        <p className="text-muted-foreground text-xs">
          {totals.credits} of{" "}
          {semester.entries.reduce((sum, entry) => sum + entry.credits, 0)}{" "}
          credits graded
        </p>
      </CardHeader>

      <CardContent>
        {semester.entries.map((entry) => (
          <GpaCourseRow
            entry={entry}
            key={entry.id}
            onAverageChange={onAverageChange}
          />
        ))}
      </CardContent>
    </Card>
  );
}
