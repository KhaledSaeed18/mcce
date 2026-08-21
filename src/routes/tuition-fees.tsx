import { createFileRoute } from "@tanstack/react-router";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { TuitionCalculator } from "@/components/tuition/tuition-calculator";
import { TuitionHero } from "@/components/tuition/tuition-hero";
import { TuitionReferenceTable } from "@/components/tuition/tuition-reference-table";
import { SITE_URL } from "@/config/site";
import { TUITION_PAGE_PATH } from "@/config/tuition";
import { buildPageMeta } from "@/lib/seo/meta";

const TUITION_URL = `${SITE_URL}${TUITION_PAGE_PATH}`;

export const Route = createFileRoute("/tuition-fees")({
  component: TuitionFeesPage,
  head: () => ({
    links: [{ href: TUITION_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "MCCE tuition references and a calculator for per semester credits, yearly charges, and annual totals.",
      title: "Tuition and Fees · MCCE",
      url: TUITION_URL,
    }),
  }),
});

function TuitionFeesPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <TuitionHero />
      <TuitionReferenceTable />
      <SectionDividerDots />
      <TuitionCalculator />
    </main>
  );
}
