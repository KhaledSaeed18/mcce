import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { RecentDialMark } from "@/components/recent/recent-dial-mark";

export function RecentHero() {
  return (
    <PageHero
      badge="RECENTLY ADDED"
      decoration={
        <PageHeroMotion width="w-32">
          <RecentDialMark />
        </PageHeroMotion>
      }
      description="What each weekly sync found that the one before it did not, newest first."
      highlight="since the last sync."
      title="Everything new,"
    />
  );
}
