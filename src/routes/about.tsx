import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "@/components/about/about-hero";
import { AboutInfo } from "@/components/about/about-info";
import { AboutPurpose } from "@/components/about/about-purpose";
import { SITE_URL } from "@/config/site";

const ABOUT_URL = `${SITE_URL}/about`;

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    links: [{ href: ABOUT_URL, rel: "canonical" }],
    meta: [
      { title: "About · MCCE" },
      {
        content:
          "What the MCCE graduate program is, and what this independent materials index does.",
        name: "description",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <AboutHero />
      <AboutInfo />
      <AboutPurpose />
    </main>
  );
}
