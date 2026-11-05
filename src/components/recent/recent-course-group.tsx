import { NodeGrid } from "@/components/drive/node-grid";
import type { RecentCourseGroup as RecentCourseGroupData } from "@/lib/drive/types";

interface RecentCourseGroupProps {
  group: RecentCourseGroupData;
}

export function RecentCourseGroup({ group }: RecentCourseGroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <h3 className="text-sm font-medium">{group.code}</h3>
        {group.name ? (
          <span className="text-muted-foreground truncate text-xs">
            {group.name}
          </span>
        ) : null}
      </div>

      <NodeGrid nodes={group.items} />
    </div>
  );
}
