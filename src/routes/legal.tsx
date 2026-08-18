import { createFileRoute } from "@tanstack/react-router";
import { LegalHero } from "@/components/legal/legal-hero";
import { LegalQuestions } from "@/components/legal/legal-questions";
import { LegalSection } from "@/components/legal/legal-section";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { LEGAL_SECTIONS } from "@/config/legal";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";

const LEGAL_URL = `${SITE_URL}/legal`;

export const Route = createFileRoute("/legal")({
  component: LegalPage,
  head: () => ({
    links: [{ href: LEGAL_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "What MCCE stores in your browser, what the contact form sends elsewhere, and the terms and disclaimer for an independent index of program materials.",
      title: "Privacy and terms · MCCE",
      url: LEGAL_URL,
    }),
  }),
});

function LegalPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <LegalHero />

      {LEGAL_SECTIONS.map((section) => (
        <LegalSection
          blocks={section.blocks}
          color={section.color}
          icon={section.icon}
          key={section.value}
          label={section.label}
        />
      ))}

      <SectionDividerDots />

      <LegalQuestions />
    </main>
  );
}
