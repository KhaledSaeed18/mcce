import { CcePlanSemesterTable } from "@/components/cce/cce-plan-semester";
import { Badge } from "@/components/ui/badge";
import { getCceYearCredits } from "@/lib/cce/credits";
import type { CcePlanYear } from "@/lib/cce/types";

interface CcePlanYearPanelProps {
  year: CcePlanYear;
}

export function CcePlanYearPanel({ year }: CcePlanYearPanelProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="font-head text-lg sm:text-xl">{year.label}</h4>
        <Badge>{getCceYearCredits(year)} credits</Badge>
      </div>

      {year.semesters.map((semester) => (
        <CcePlanSemesterTable key={semester.id} semester={semester} />
      ))}
    </section>
  );
}
