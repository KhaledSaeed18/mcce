import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "@/components/about/about-hero";
import { AboutInfo } from "@/components/about/about-info";
import { AboutPurpose } from "@/components/about/about-purpose";
import { AboutTrust } from "@/components/about/about-trust";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";
import { buildPageGraph } from "@/lib/seo/page-schema";
import { formatPageTitle } from "@/lib/seo/page-title";

const ABOUT_URL = `${SITE_URL}/about`;

const ABOUT_DESCRIPTION =
  "What the LIU M.S. in Computer and Communication Engineering (MCCE) graduate program is, and what this independent index offers: course files, past exams, study planning tools, and a PDF editor.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    links: [{ href: ABOUT_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: ABOUT_DESCRIPTION,
      title: formatPageTitle(
        "About MCCE",
        "LIU Computer and Communication Engineering"
      ),
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
      <JsonLd
        data={buildPageGraph({
          description: ABOUT_DESCRIPTION,
          name: "About MCCE",
          pageType: "AboutPage",
          url: ABOUT_URL,
        })}
      />
    </main>
  );
}
