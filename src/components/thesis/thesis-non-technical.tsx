import { ThesisNamedGrid } from "@/components/thesis/thesis-named-grid";
import { ThesisSection } from "@/components/thesis/thesis-section";
import {
  THESIS_GUIDE_SECTIONS,
  THESIS_NON_TECHNICAL,
  THESIS_NON_TECHNICAL_NOTE,
} from "@/config/thesis";

export function ThesisNonTechnical() {
  return (
    <ThesisSection
      description={`Chapter 5 covers what every thesis must address beyond the engineering. ${THESIS_NON_TECHNICAL_NOTE}`}
      id={THESIS_GUIDE_SECTIONS.nonTechnical.id}
      title="Chapter 5, non-technical aspects"
    >
      <ThesisNamedGrid items={THESIS_NON_TECHNICAL} />
    </ThesisSection>
  );
}
