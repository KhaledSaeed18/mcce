import { createFileRoute } from "@tanstack/react-router";
import { FaqCategory } from "@/components/faq/faq-category";
import { FaqCta } from "@/components/faq/faq-cta";
import { FaqHero } from "@/components/faq/faq-hero";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import { PROGRAM_FAQ, PROGRAM_FAQ_GROUPS } from "@/config/faq";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";
import { buildFaqSchema } from "@/lib/seo/schema";

const FAQ_URL = `${SITE_URL}/faq`;

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    links: [{ href: FAQ_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Answers about the MCCE program and how this materials index works.",
      title: "FAQ · MCCE",
      url: FAQ_URL,
    }),
  }),
});

function FaqPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <FaqHero />

      <div className="flex flex-col gap-10">
        {PROGRAM_FAQ_GROUPS.map((group) => (
          <FaqCategory
            color={group.color}
            icon={group.icon}
            items={group.items}
            key={group.value}
            label={group.label}
          />
        ))}
      </div>

      <SectionDividerDots />

      <FaqCta />

      <JsonLd data={buildFaqSchema(PROGRAM_FAQ)} />
    </main>
  );
}
