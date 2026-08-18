import { PageHero } from "@/components/marketing/page-hero";
import { LEGAL_LAST_UPDATED } from "@/config/legal";

export function LegalHero() {
  return (
    <PageHero
      badge="LEGAL"
      description="What this site stores, what it sends elsewhere, and what it is not."
      highlight="written plainly."
      title="Privacy and terms,"
    >
      <p className="text-muted-foreground text-xs sm:text-sm">
        Last updated {LEGAL_LAST_UPDATED}
      </p>
    </PageHero>
  );
}
