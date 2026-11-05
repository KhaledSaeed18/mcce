import { Link } from "@tanstack/react-router";
import type { StageSection } from "@/lib/resources/group";

interface ThesisStageJumpProps {
  sections: StageSection[];
}

export function ThesisStageJump({ sections }: ThesisStageJumpProps) {
  return (
    <nav aria-label="Jump to a thesis stage" className="flex flex-wrap gap-2">
      {sections.map(({ stage }, index) => (
        <Link
          className="hover:bg-primary rounded border-2 px-2 py-1 text-xs font-medium transition"
          hash={stage.id}
          key={stage.id}
          to="."
        >
          <span className="text-muted-foreground mr-1">{index}</span>
          {stage.label}
        </Link>
      ))}
    </nav>
  );
}
