import { createFileRoute } from "@tanstack/react-router";
import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactContribute } from "@/components/contact/contact-contribute";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactSupport } from "@/components/contact/contact-support";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";
import { buildPageGraph } from "@/lib/seo/page-schema";
import { formatPageTitle } from "@/lib/seo/page-title";

const CONTACT_URL = `${SITE_URL}/contact`;

const CONTACT_DESCRIPTION =
  "Reach the MCCE index maintainer by email or GitHub, report a bug, request a feature, or share materials for the program archive.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    links: [{ href: CONTACT_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: CONTACT_DESCRIPTION,
      title: formatPageTitle("Contact", SITE_NAME),
      url: CONTACT_URL,
    }),
  }),
});

function ContactPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ContactHero />
      <ContactForm />
      <SectionDividerDots />
      <ContactChannels />
      <ContactSupport />
      <SectionDividerDots />
      <ContactContribute />
      <JsonLd
        data={buildPageGraph({
          description: CONTACT_DESCRIPTION,
          name: "Contact",
          pageType: "ContactPage",
          url: CONTACT_URL,
        })}
      />
    </main>
  );
}
