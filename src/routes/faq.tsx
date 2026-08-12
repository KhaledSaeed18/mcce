import { createFileRoute } from "@tanstack/react-router";
import { FaqCategory } from "@/components/faq/faq-category";
import { FaqCta } from "@/components/faq/faq-cta";
import { FaqHero } from "@/components/faq/faq-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { PROGRAM_FAQ, PROGRAM_FAQ_GROUPS } from "@/config/faq";
import { SITE_URL } from "@/config/site";
import { buildFaqSchema } from "@/lib/seo/schema";

const FAQ_URL = `${SITE_URL}/faq`;

export const Route = createFileRoute("/faq")({
  component: FaqPage,
  head: () => ({
    links: [{ href: FAQ_URL, rel: "canonical" }],
    meta: [
      { title: "FAQ · MCCE" },
      {
        content:
          "Answers about the MCCE program and how this materials index works.",
        name: "description",
      },
    ],
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

      <FaqCta />

      <JsonLd data={buildFaqSchema(PROGRAM_FAQ)} />
    </main>
  );
}
