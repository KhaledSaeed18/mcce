import { createFileRoute } from "@tanstack/react-router";
import { CceAdmissions } from "@/components/cce/cce-admissions";
import { CceCatalogSection } from "@/components/cce/cce-catalog-section";
import { CceDifference } from "@/components/cce/cce-difference";
import { CceElectives } from "@/components/cce/cce-electives";
import { CceFacts } from "@/components/cce/cce-facts";
import { CceFaqSection } from "@/components/cce/cce-faq-section";
import { CceHero } from "@/components/cce/cce-hero";
import { CceIntro } from "@/components/cce/cce-intro";
import { CceOfficialDocs } from "@/components/cce/cce-official-docs";
import { CcePlanSection } from "@/components/cce/cce-plan-section";
import { CceProgramsSection } from "@/components/cce/cce-programs-section";
import { CceScopeNote } from "@/components/cce/cce-scope-note";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import {
  CCE_FAQ,
  CCE_META_DESCRIPTION,
  CCE_META_TITLE,
  CCE_PAGE_PATH,
} from "@/config/cce/content";
import { CCE_PROGRAMS } from "@/config/cce/programs";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildCceProgramSchema } from "@/lib/seo/cce-schema";
import { buildPageMeta } from "@/lib/seo/meta";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schema";

const CCE_URL = `${SITE_URL}${CCE_PAGE_PATH}`;

export const Route = createFileRoute("/cce")({
  component: CcePage,
  head: () => ({
    links: [{ href: CCE_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: CCE_META_DESCRIPTION,
      title: `${CCE_META_TITLE} · ${SITE_NAME}`,
      url: CCE_URL,
    }),
  }),
});

function CcePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <CceHero />
      <CceScopeNote />
      <CceFacts />
      <CceIntro />

      <SectionDividerDots />

      <CceProgramsSection />
      <CceDifference />

      <SectionDividerDots />

      <CcePlanSection />
      <CceElectives />

      <SectionDividerDots />

      <CceCatalogSection />
      <CceOfficialDocs />

      <SectionDividerDots />

      <CceAdmissions />

      <SectionDividerDots />

      <CceFaqSection />

      {CCE_PROGRAMS.map((program) => (
        <JsonLd data={buildCceProgramSchema(program)} key={program.id} />
      ))}
      <JsonLd data={buildFaqSchema(CCE_FAQ)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "LIU CCE undergraduate programs", url: CCE_URL },
        ])}
      />
    </main>
  );
}
