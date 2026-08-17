import { NodeCard } from "@/components/drive/node-card";
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
