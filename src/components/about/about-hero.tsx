import { AboutBrandMark } from "@/components/about/about-brand-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";

export function AboutHero() {
  return (
    <PageHero
      badge="ABOUT MCCE"
      decoration={
        <PageHeroMotion width="w-36">
          <AboutBrandMark />
        </PageHeroMotion>
      }
      description="What MCCE covers, and why this site exists outside the official page."
      highlight="indexed independently."
      title="A graduate program,"
    />
  );
}
