import { TuitionReferenceCard } from "@/components/tuition/tuition-reference-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TUITION_ACADEMIC_YEAR_LABEL,
  TUITION_DEFAULT_USD_TO_LBP_RATE,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_PRICE_CHANGE_NOTE,
  TUITION_PROGRAM_LABEL,
  TUITION_REGISTRATION_USD_PER_SEMESTER,
  TUITION_WARNING_NOTE,
} from "@/config/tuition";
import { convertLbpToUsd, formatLbp, formatUsd } from "@/lib/tuition/calc";
import { TUITION_REFERENCE_FACTS } from "@/lib/tuition/reference";

const NSSF_YEARLY_USD_ESTIMATE = convertLbpToUsd(
  TUITION_NSSF_LBP_YEARLY,
  TUITION_DEFAULT_USD_TO_LBP_RATE
);

export function TuitionReferenceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Official reference snapshot ({TUITION_ACADEMIC_YEAR_LABEL})</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="md:hidden">
          <TuitionReferenceCard />
        </div>

        <table className="hidden w-full border-collapse text-left text-sm md:table">
          <thead>
            <tr className="border-foreground/20 border-b-2">
              <th className="py-2 pr-3">Faculty</th>
              {TUITION_REFERENCE_FACTS.map((fact) => (
                <th className="py-2 pr-3 last:pr-0" key={fact.label}>
                  {fact.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr className="border-foreground/10 border-b">
              <td className="py-3 pr-3 font-medium">{TUITION_PROGRAM_LABEL}</td>
              {TUITION_REFERENCE_FACTS.map((fact) => (
                <td className="py-3 pr-3 last:pr-0" key={fact.label}>
                  {fact.value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <div className="space-y-1 text-sm">
          <p>
            Registration fees:{" "}
            {formatUsd(TUITION_REGISTRATION_USD_PER_SEMESTER)} per semester.
          </p>
          <p>
            NSSF: {formatLbp(TUITION_NSSF_LBP_YEARLY)} yearly, if applicable
            (about {formatUsd(NSSF_YEARLY_USD_ESTIMATE)} at the{" "}
            {TUITION_ACADEMIC_YEAR_LABEL} reference rate).
          </p>
          <p className="text-muted-foreground">{TUITION_PRICE_CHANGE_NOTE}</p>
          <p className="text-muted-foreground">{TUITION_WARNING_NOTE}</p>
        </div>
      </CardContent>
    </Card>
  );
}
