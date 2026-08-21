import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TUITION_ACADEMIC_YEAR_LABEL,
  TUITION_AVERAGE_CREDITS_PER_YEAR,
  TUITION_LBP_PER_CREDIT,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_NUMBER_OF_YEARS,
  TUITION_PRICE_CHANGE_NOTE,
  TUITION_PROGRAM_LABEL,
  TUITION_REGISTRATION_USD_YEARLY,
  TUITION_TOTAL_LBP_PER_YEAR,
  TUITION_TOTAL_USD_PER_YEAR,
  TUITION_USD_PER_CREDIT,
  TUITION_WARNING_NOTE,
} from "@/config/tuition";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";

export function TuitionReferenceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Official reference snapshot ({TUITION_ACADEMIC_YEAR_LABEL})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 border-collapse text-left text-sm">
            <thead>
              <tr className="border-foreground/20 border-b-2">
                <th className="py-2 pr-3">Faculty</th>
                <th className="py-2 pr-3">Average credits/year</th>
                <th className="py-2 pr-3">No. of years</th>
                <th className="py-2 pr-3">USD per credit</th>
                <th className="py-2 pr-3">Total USD/year</th>
                <th className="py-2 pr-3">LBP per credit</th>
                <th className="py-2">Total LBP/year</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-foreground/10 border-b">
                <td className="py-3 pr-3 font-medium">
                  {TUITION_PROGRAM_LABEL}
                </td>
                <td className="py-3 pr-3">
                  {TUITION_AVERAGE_CREDITS_PER_YEAR}
                </td>
                <td className="py-3 pr-3">{TUITION_NUMBER_OF_YEARS}</td>
                <td className="py-3 pr-3">
                  {formatUsd(TUITION_USD_PER_CREDIT)}
                </td>
                <td className="py-3 pr-3">
                  {formatUsd(TUITION_TOTAL_USD_PER_YEAR)}
                </td>
                <td className="py-3 pr-3">
                  {formatLbp(TUITION_LBP_PER_CREDIT)}
                </td>
                <td className="py-3">
                  {formatLbp(TUITION_TOTAL_LBP_PER_YEAR)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-1 text-sm">
          <p>
            Registration fees: {formatUsd(TUITION_REGISTRATION_USD_YEARLY)} per
            year.
          </p>
          <p>
            NSSF: {formatLbp(TUITION_NSSF_LBP_YEARLY)} yearly, if applicable.
          </p>
          <p className="text-muted-foreground">{TUITION_PRICE_CHANGE_NOTE}</p>
          <p className="text-muted-foreground">{TUITION_WARNING_NOTE}</p>
        </div>
      </CardContent>
    </Card>
  );
}
