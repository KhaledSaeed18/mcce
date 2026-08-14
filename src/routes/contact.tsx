import { createFileRoute } from "@tanstack/react-router";
import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactContribute } from "@/components/contact/contact-contribute";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactSupport } from "@/components/contact/contact-support";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";

const CONTACT_URL = `${SITE_URL}/contact`;

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    links: [{ href: CONTACT_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Reach the MCCE index maintainer by email or GitHub, report a bug, request a feature, or share materials for the program archive.",
      title: "Contact · MCCE",
      url: CONTACT_URL,
    }),
  }),
});

function ContactPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ContactHero />
      <ContactForm />
      <ContactChannels />
      <ContactSupport />
      <ContactContribute />
    </main>
  );
}
