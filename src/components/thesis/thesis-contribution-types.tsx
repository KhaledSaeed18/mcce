import { ThesisNamedGrid } from "@/components/thesis/thesis-named-grid";
import {
  THESIS_CONTRIBUTION_NOTE,
  THESIS_CONTRIBUTION_TYPES,
} from "@/config/thesis-topic";

export function ThesisContributionTypes() {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-head text-base">
        What a realistic contribution looks like
      </h3>
      <p className="max-w-3xl text-muted-foreground text-sm">
        {THESIS_CONTRIBUTION_NOTE}
      </p>
      <ThesisNamedGrid items={THESIS_CONTRIBUTION_TYPES} />
    </div>
  );
}
