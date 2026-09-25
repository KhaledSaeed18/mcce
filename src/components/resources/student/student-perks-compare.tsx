import { STUDENT_COMPARE_ROWS } from "@/config/resources/student-perks";
import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerksCompareProps {
  perks: StudentPerk[];
}

export function StudentPerksCompare({ perks }: StudentPerksCompareProps) {
  return (
    <section aria-labelledby="compare" className="flex flex-col gap-4">
      <h2 className="font-head text-2xl" id="compare">
        Compare the three
      </h2>
      <div className="overflow-x-auto rounded-lg border-2 bg-card shadow-md">
        <table className="w-full min-w-160 text-left text-sm">
          <thead>
            <tr className="border-b-2">
              <th className="p-3 font-head" scope="col">
                Point
              </th>
              {perks.map((perk) => (
                <th className="p-3 font-head" key={perk.id} scope="col">
                  {perk.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENT_COMPARE_ROWS.map((row) => (
              <tr className="border-b last:border-0" key={row.label}>
                <th className="p-3 font-medium" scope="row">
                  {row.label}
                </th>
                {perks.map((perk, perkIndex) => (
                  <td className="p-3 text-muted-foreground" key={perk.id}>
                    {row.values[perkIndex]}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th className="p-3 font-medium" scope="row">
                Card
              </th>
              {perks.map((perk) => (
                <td className="p-3 text-muted-foreground" key={perk.id}>
                  {perk.cardRequired
                    ? "Required, hold may show"
                    : "Not required"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
