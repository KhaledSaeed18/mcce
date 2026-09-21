import { ResourceGrid } from "@/components/resources/resource-grid";
import { Badge } from "@/components/ui/badge";
import { THESIS_TERM_LABELS } from "@/config/resources/thesis-stages";
import type { StageSection } from "@/lib/resources/group";

interface ThesisStageSectionProps {
  order: number;
  section: StageSection;
}

export function ThesisStageSection({
  order,
  section,
}: ThesisStageSectionProps) {
  const { stage, tools } = section;

  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id={stage.id}>
      <div className="flex flex-col gap-2 border-b-2 pb-3">
        <div className="flex items-center gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black bg-primary font-head text-sm">
            {order}
          </span>
          <h2
            className="min-w-0 flex-1 truncate font-head text-lg sm:text-xl"
            tabIndex={-1}
          >
            {stage.label}
          </h2>
          <Badge variant="outline">{THESIS_TERM_LABELS[stage.term]}</Badge>
        </div>
        <p className="max-w-3xl text-muted-foreground text-sm">{stage.note}</p>
      </div>

      <ResourceGrid tools={tools} />
    </section>
  );
}
