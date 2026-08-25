import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { SitemapTreeMark } from "@/components/sitemap/sitemap-tree-mark";

export function SitemapHero() {
  return (
    <PageHero
      badge="SITEMAP"
      decoration={
        <PageHeroMotion width="w-32">
          <SitemapTreeMark />
        </PageHeroMotion>
      }
      description="Every page on this site, in one list. The machine-readable version lives at /sitemap.xml and carries the Drive folders too."
      highlight="on one page."
      title="Everything here,"
    />
  );
}
