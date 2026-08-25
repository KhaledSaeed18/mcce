import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { SavedStackMark } from "@/components/saved/saved-stack-mark";

export function SavedHero() {
  return (
    <PageHero
      badge="SAVED"
      decoration={
        <PageHeroMotion width="w-32">
          <SavedStackMark />
        </PageHeroMotion>
      }
      description="Kept in this browser only. Nothing is sent anywhere, and clearing site data clears this list."
      highlight="in one place."
      title="The files you kept,"
    />
  );
}
