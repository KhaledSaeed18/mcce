import { ThesisNamedGrid } from "@/components/thesis/thesis-named-grid";
import { ThesisSection } from "@/components/thesis/thesis-section";
import {
  THESIS_GUIDE_SECTIONS,
  THESIS_TEMPLATE_RULES,
  THESIS_TEMPLATE_SOURCE,
} from "@/config/thesis";

export function ThesisTemplateRules() {
  return (
    <ThesisSection
      description={THESIS_TEMPLATE_SOURCE}
      id={THESIS_GUIDE_SECTIONS.template.id}
      title="Working in the template"
    >
      <ThesisNamedGrid items={THESIS_TEMPLATE_RULES} />
    </ThesisSection>
  );
}
