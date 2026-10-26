import { ThesisSection } from "@/components/thesis/thesis-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { THESIS_GUIDE_SECTIONS, THESIS_SLR_PHASES } from "@/config/thesis";

export function ThesisSlr() {
  return (
    <ThesisSection
      description="Once the topic is agreed, chapter 4 is built with the Systematic Literature Review method: plan, execute, report."
      id={THESIS_GUIDE_SECTIONS.literatureReview.id}
      title="The literature review"
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {THESIS_SLR_PHASES.map((phase, index) => (
          <li className="flex *:flex-1" key={phase.title}>
            <Card>
              <CardHeader className="border-b-2 pb-3">
                <CardTitle>
                  <h3 className="font-head">
                    <span className="mr-2 text-primary">{index + 1}</span>
                    {phase.title}
                  </h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
                  {phase.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </ThesisSection>
  );
}
