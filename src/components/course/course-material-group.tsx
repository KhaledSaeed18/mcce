import { Link } from "@tanstack/react-router";
import { NodeGrid } from "@/components/drive/node-grid";
import type { CourseMaterialGroup as CourseMaterialGroupData } from "@/lib/drive/types";

interface CourseMaterialGroupProps {
  courseCode: string;
  group: CourseMaterialGroupData;
}

export function CourseMaterialGroup({
  courseCode,
  group,
}: CourseMaterialGroupProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3 border-b-2 pb-2">
        <h2 className="font-head text-lg">{group.label}</h2>
        <span className="text-muted-foreground text-sm">
          {group.items.length}
        </span>
        {group.type === "exam" ? (
          <Link
            className="ml-auto text-sm underline underline-offset-4"
            hash={courseCode}
            to="/exams"
          >
            By term
          </Link>
        ) : null}
      </div>

      <NodeGrid nodes={group.items} />
    </section>
  );
}
