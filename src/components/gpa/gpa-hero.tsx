import { PageHero } from "@/components/marketing/page-hero";
import { MCCE_DEGREE_CREDITS } from "@/config/gpa";

export function GpaHero() {
  return (
    <PageHero
      badge="GPA CALCULATOR"
      description={`Type a course average and everything else follows: semester GPA, cumulative GPA, academic standing, and the highest final GPA still within reach across all ${MCCE_DEGREE_CREDITS} credits. Grades stay on this device.`}
      highlight="and where they land you."
      title="Your grades,"
    />
  );
}
