import { NodeGrid } from "@/components/drive/node-grid";
import { UNRECORDED_TERM_LABEL } from "@/config/exams";
import type { ExamTermGroup as ExamTermGroupData } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

interface ExamTermGroupProps {
  group: ExamTermGroupData;
}

export function ExamTermGroup({ group }: ExamTermGroupProps) {
  const isUnrecorded = group.label === UNRECORDED_TERM_LABEL;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-2">
        <h3
          className={cn(
            "font-medium text-sm",
            isUnrecorded && "text-muted-foreground"
          )}
        >
          {group.label}
        </h3>
        <span className="text-muted-foreground text-xs">
          {group.items.length} paper{group.items.length === 1 ? "" : "s"}
        </span>
      </div>

      <NodeGrid nodes={group.items} />
    </div>
  );
}
