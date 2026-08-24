import { Badge } from "@/components/ui/badge";
import { getCceSemesterCredits } from "@/lib/cce/credits";
import { getCceCourse } from "@/lib/cce/lookup";
import type { CcePlanEntry, CcePlanSemester } from "@/lib/cce/types";

const HEAD_CLASSES =
  "whitespace-nowrap px-3 py-2 text-left font-head font-medium text-muted-foreground text-xs uppercase tracking-wide";
const CELL_CLASSES = "px-3 py-2 align-top";

interface RowProps {
  entry: CcePlanEntry;
}

function PlanRow({ entry }: RowProps) {
  if (entry.kind === "elective") {
    return (
      <tr className="border-t-2">
        <td className={`${CELL_CLASSES} font-head`}>Elective</td>
        <td className={CELL_CLASSES}>{entry.label}</td>
        <td className={`${CELL_CLASSES} tabular-nums`}>{entry.credits}</td>
        <td className={CELL_CLASSES} colSpan={2} />
      </tr>
    );
  }

  const course = getCceCourse(entry.code);

  if (!course) {
    return null;
  }

  return (
    <tr className="border-t-2">
      <td className={`${CELL_CLASSES} whitespace-nowrap font-head`}>
        {course.code}
      </td>
      <td className={CELL_CLASSES}>{course.name}</td>
      <td className={`${CELL_CLASSES} tabular-nums`}>{course.credits}</td>
      <td className={`${CELL_CLASSES} text-muted-foreground`}>
        {course.prerequisites.join(", ")}
      </td>
      <td className={`${CELL_CLASSES} text-muted-foreground`}>
        {course.corequisites.join(", ")}
      </td>
    </tr>
  );
}

interface CcePlanSemesterTableProps {
  semester: CcePlanSemester;
}

export function CcePlanSemesterTable({ semester }: CcePlanSemesterTableProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <h5 className="font-head text-base sm:text-lg">{semester.label}</h5>
        <Badge variant="outline">
          {getCceSemesterCredits(semester)} credits
        </Badge>
        <Badge variant="outline">{semester.entries.length} courses</Badge>
      </div>

      <div className="overflow-x-auto rounded border-2 bg-card">
        <table className="w-full min-w-[42rem] border-collapse text-sm">
          <thead>
            <tr>
              <th className={HEAD_CLASSES} scope="col">
                Code
              </th>
              <th className={HEAD_CLASSES} scope="col">
                Title
              </th>
              <th className={HEAD_CLASSES} scope="col">
                Credits
              </th>
              <th className={HEAD_CLASSES} scope="col">
                Prerequisites
              </th>
              <th className={HEAD_CLASSES} scope="col">
                Corequisites
              </th>
            </tr>
          </thead>
          <tbody>
            {semester.entries.map((entry, index) => (
              <PlanRow
                entry={entry}
                key={
                  entry.kind === "course"
                    ? entry.code
                    : `${semester.id}-elective-${index}`
                }
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
