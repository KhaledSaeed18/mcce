import { createFileRoute } from "@tanstack/react-router";
import { AdmissionsDetails } from "@/components/admissions/admissions-details";
import { AdmissionsHero } from "@/components/admissions/admissions-hero";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import { ADMISSIONS_PAGE_PATH, ADMISSIONS_TRACKS } from "@/config/admissions";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";
import { buildAdmissionsSchema, buildBreadcrumbSchema } from "@/lib/seo/schema";

const ADMISSIONS_URL = `${SITE_URL}${ADMISSIONS_PAGE_PATH}`;

export const Route = createFileRoute("/admissions")({
  component: AdmissionsPage,
  head: () => ({
    links: [{ href: ADMISSIONS_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "A clear admissions guide for LIU MCCE graduate applicants, including required documents, fees, LIU and non-LIU flows, and official contact points.",
      title: "Admissions Guide · MCCE",
      url: ADMISSIONS_URL,
    }),
  }),
});

function AdmissionsPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <AdmissionsHero />
      <SectionDividerDots />
      <AdmissionsDetails />

      <JsonLd data={buildAdmissionsSchema(ADMISSIONS_TRACKS)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Admissions guide", url: ADMISSIONS_URL },
        ])}
      />
    </main>
  );
}
