import { ThesisNamedGrid } from "@/components/thesis/thesis-named-grid";
import { ThesisSection } from "@/components/thesis/thesis-section";
import { Card, CardContent } from "@/components/ui/card";
import {
  THESIS_ELIGIBILITY,
  THESIS_FACTS,
  THESIS_GUIDE_SECTIONS,
} from "@/config/thesis";

export function ThesisFacts() {
  return (
    <ThesisSection
      description="The final project of the program, done over the last two semesters."
      id={THESIS_GUIDE_SECTIONS.howItWorks.id}
      title="How the thesis works"
    >
      <ThesisNamedGrid items={THESIS_FACTS} />

      <Card size="sm">
        <CardContent className="flex flex-col gap-2">
          <h3 className="font-head text-sm">Who can register</h3>
          <p className="text-muted-foreground text-sm">
            Eligibility is checked after registration, and students who miss any
            of these are removed from the section.
          </p>
          <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
            {THESIS_ELIGIBILITY.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </ThesisSection>
  );
}
