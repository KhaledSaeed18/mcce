import { useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import type { CurriculumCourseContext } from "@/lib/curriculum/types";

interface RequirementBadgeProps {
  code: string;
  context: CurriculumCourseContext | undefined;
  onSelect: (code: string) => void;
}

function RequirementBadge({ code, context, onSelect }: RequirementBadgeProps) {
  const handleClick = useCallback(() => onSelect(code), [code, onSelect]);

  return (
    <button
      className="focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      onClick={handleClick}
      type="button"
    >
      <Badge className="cursor-pointer" variant="outline">
        {code}
        {context ? `, ${context.course.name}` : ""}
      </Badge>
    </button>
  );
}

interface CurriculumRequirementListProps {
  codes: string[];
  label: string;
  lookup: Map<string, CurriculumCourseContext>;
  onSelect: (code: string) => void;
}

export function CurriculumRequirementList({
  codes,
  label,
  lookup,
  onSelect,
}: CurriculumRequirementListProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </h3>
      {codes.length === 0 ? (
        <p className="text-sm">None</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {codes.map((code) => (
            <RequirementBadge
              code={code}
              context={lookup.get(code)}
              key={code}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
