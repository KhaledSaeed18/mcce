import { AboutCap } from "@/components/about/about-cap";
import { AboutCapDark } from "@/components/about/about-cap-dark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroDecoration } from "@/components/marketing/page-hero-decoration";

export function AboutHero() {
  return (
    <PageHero
      badge="ABOUT MCCE"
      decoration={
        <PageHeroDecoration
          dark={<AboutCapDark />}
          light={<AboutCap />}
          width="w-40"
        />
      }
      description="What MCCE covers, and why this site exists outside the official page."
      highlight="indexed independently."
      title="A graduate program,"
    />
  );
}
