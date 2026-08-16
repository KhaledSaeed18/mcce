import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MAX_QUALITY_POINT_AVERAGE,
  QPT_AVERAGE_DIVISOR,
  QPT_AVERAGE_OFFSET,
  SCALE_REFERENCES,
} from "@/config/gpa";

export function GpaScaleTable() {
  return (
    <Card>
      <CardHeader className="border-b-2 pb-3">
        <CardTitle>The scale</CardTitle>
        <p className="text-muted-foreground text-sm">
          Quality points are (average − {QPT_AVERAGE_OFFSET}) ÷{" "}
          {QPT_AVERAGE_DIVISOR}, so every point of average counts. There are no
          letter bands: an 87 and an 89 are not the same grade. At{" "}
          {MAX_QUALITY_POINT_AVERAGE} and above the scale flattens at 4.00.
        </p>
      </CardHeader>

      <CardContent>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 text-muted-foreground text-xs uppercase tracking-wide">
              <th className="py-2 text-left font-normal">Average</th>
              <th className="py-2 text-right font-normal">Quality points</th>
            </tr>
          </thead>
          <tbody>
            {SCALE_REFERENCES.map((reference) => (
              <tr
                className="border-border/60 border-b-2 last:border-b-0"
                key={reference.average}
              >
                <td className="py-2 tabular-nums">{reference.average}</td>
                <td className="py-2 text-right tabular-nums">
                  {reference.qualityPoints.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
