import { PageTeaserCard } from "@/components/marketing/page-teaser-card";
import { PAGE_TEASERS } from "@/config/page-teasers";

export function PageTeaserSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-head text-2xl sm:text-3xl">More than the files</h2>
        <p className="text-muted-foreground text-sm">
          The rest of the site, one click away.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PAGE_TEASERS.map((teaser) => (
          <PageTeaserCard key={teaser.to} teaser={teaser} />
        ))}
      </div>
    </section>
  );
}
