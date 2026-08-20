import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "@/components/about/about-hero";
import { AboutInfo } from "@/components/about/about-info";
import { AboutPurpose } from "@/components/about/about-purpose";
import { AboutTrust } from "@/components/about/about-trust";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";

const ABOUT_URL = `${SITE_URL}/about`;

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    links: [{ href: ABOUT_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "What the MCCE graduate program is, and what this independent materials index does.",
      title: "About · MCCE",
      url: ABOUT_URL,
    }),
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <AboutHero />
      <AboutInfo />
      <SectionDividerDots />
      <AboutPurpose />
      <SectionDividerDots />
      <AboutTrust />
    </main>
  );
}
