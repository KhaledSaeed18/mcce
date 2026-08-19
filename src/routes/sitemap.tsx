import { createFileRoute } from "@tanstack/react-router";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { SitemapBrowseGroup } from "@/components/sitemap/sitemap-browse-group";
import { SitemapCourseGroup } from "@/components/sitemap/sitemap-course-group";
import { SitemapDriveGroup } from "@/components/sitemap/sitemap-drive-group";
import { SitemapGroup } from "@/components/sitemap/sitemap-group";
import { SitemapHero } from "@/components/sitemap/sitemap-hero";
import { SITE_URL } from "@/config/site";
import { SITEMAP_GROUPS } from "@/config/sitemap";
import { buildPageMeta } from "@/lib/seo/meta";

const SITEMAP_URL = `${SITE_URL}/sitemap`;

export const Route = createFileRoute("/sitemap")({
  component: SitemapPage,
  head: () => ({
    links: [{ href: SITEMAP_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Every page on MCCE in one list: the index, course pages, program tools, Drive folders, and the site's own pages.",
      title: "Sitemap · MCCE",
      url: SITEMAP_URL,
    }),
  }),
});

function SitemapPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <SitemapHero />

      {SITEMAP_GROUPS.map((group) => (
        <SitemapGroup
          color={group.color}
          entries={group.entries}
          icon={group.icon}
          key={group.value}
          label={group.label}
        />
      ))}

      <SitemapBrowseGroup />

      <SitemapDriveGroup />

      <SectionDividerDots />

      <SitemapCourseGroup />
    </main>
  );
}
