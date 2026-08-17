import { CurriculumClipboard } from "@/components/curriculum/curriculum-clipboard";
import { CurriculumClipboardDark } from "@/components/curriculum/curriculum-clipboard-dark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroDecoration } from "@/components/marketing/page-hero-decoration";

export function CurriculumHero() {
  return (
    <PageHero
      badge="PLAN OF STUDY"
      decoration={
        <PageHeroDecoration
          dark={<CurriculumClipboardDark />}
          light={<CurriculumClipboard />}
          width="w-40"
        />
      }
      description="Every course in the MCCE program: description, objectives, credits, and how each one connects to the next through prerequisites and corequisites. Open a course to see the details, or jump straight to its indexed materials."
      highlight="semester by semester."
      title="The full curriculum,"
    />
  );
}
