import { createFileRoute } from "@tanstack/react-router";
import { AdmissionsDetails } from "@/components/admissions/admissions-details";
import { AdmissionsHero } from "@/components/admissions/admissions-hero";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";

const ADMISSIONS_URL = `${SITE_URL}/admissions`;

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
    </main>
  );
}
