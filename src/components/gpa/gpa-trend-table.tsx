import type { GpaTrendPoint } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";

interface GpaTrendTableProps {
  points: GpaTrendPoint[];
}

export function GpaTrendTable({ points }: GpaTrendTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b-2 text-muted-foreground text-xs uppercase tracking-wide">
            <th className="py-2 text-left font-normal">Semester</th>
            <th className="py-2 text-right font-normal">Credits</th>
            <th className="py-2 text-right font-normal">Semester GPA</th>
            <th className="py-2 text-right font-normal">Cumulative</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <tr
              className="border-border/60 border-b-2 last:border-b-0"
              key={point.id}
            >
              <td className="py-2">{point.label}</td>
              <td className="py-2 text-right tabular-nums">{point.credits}</td>
              <td className="py-2 text-right tabular-nums">
                {formatGpa(point.semesterGpa)}
              </td>
              <td className="py-2 text-right tabular-nums">
                {formatGpa(point.cumulativeGpa)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
