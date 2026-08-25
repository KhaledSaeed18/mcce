import { CurriculumPlanMark } from "@/components/curriculum/curriculum-plan-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";

export function CurriculumHero() {
  return (
    <PageHero
      badge="PLAN OF STUDY"
      decoration={
        <PageHeroMotion width="w-40">
          <CurriculumPlanMark />
        </PageHeroMotion>
      }
      description="Every course in the MCCE program: description, objectives, credits, and how each one connects to the next through prerequisites and corequisites. Open a course to see the details, or jump straight to its indexed materials."
      highlight="semester by semester."
      title="The full curriculum,"
    />
  );
}
