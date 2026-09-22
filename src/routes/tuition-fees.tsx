import { createFileRoute } from "@tanstack/react-router";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import { TuitionAidExplainer } from "@/components/tuition/tuition-aid-explainer";
import { TuitionCalculator } from "@/components/tuition/tuition-calculator";
import { TuitionHero } from "@/components/tuition/tuition-hero";
import { TuitionReferenceTable } from "@/components/tuition/tuition-reference-table";
import { TuitionSupportLinks } from "@/components/tuition/tuition-support-links";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { TUITION_PAGE_PATH } from "@/config/tuition";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";
import { buildBreadcrumbSchema, buildTuitionSchema } from "@/lib/seo/schema";

const TUITION_URL = `${SITE_URL}${TUITION_PAGE_PATH}`;

export const Route = createFileRoute("/tuition-fees")({
  component: TuitionFeesPage,
  head: () => ({
    links: [{ href: TUITION_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "MCCE tuition at LIU: cost per credit in USD and LBP, the yearly NSSF charge of 8,400,000 LBP with its USD equivalent, and a calculator for per semester credits, yearly charges, and annual totals.",
      title: formatPageTitle("Tuition and Fees", SITE_NAME),
      url: TUITION_URL,
    }),
  }),
});

function TuitionFeesPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <TuitionHero />
      <TuitionReferenceTable />
      <TuitionAidExplainer />
      <SectionDividerDots />
      <TuitionCalculator />
      <SectionDividerDots />
      <TuitionSupportLinks />

      <JsonLd data={buildTuitionSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tuition and fees", url: TUITION_URL },
        ])}
      />
    </main>
  );
}
