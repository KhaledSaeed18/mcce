import { GpaScoreMark } from "@/components/gpa/gpa-score-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { MCCE_DEGREE_CREDITS } from "@/config/gpa";

export function GpaHero() {
  return (
    <PageHero
      badge="GPA CALCULATOR"
      decoration={
        <PageHeroMotion width="w-32">
          <GpaScoreMark />
        </PageHeroMotion>
      }
      description={`Type a course average and everything else follows: semester GPA, cumulative GPA, academic standing, and the highest final GPA still within reach across all ${MCCE_DEGREE_CREDITS} credits. Grades stay on this device.`}
      highlight="and where they land you."
      title="Your grades,"
    />
  );
}
