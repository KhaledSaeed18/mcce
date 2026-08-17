import { FeatureLinkCard } from "@/components/marketing/feature-link-card";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { GpaFeatureTile } from "@/components/marketing/gpa-feature-tile";
import { PlanFeatureTile } from "@/components/marketing/plan-feature-tile";
import { SearchFeatureTile } from "@/components/marketing/search-feature-tile";
import { Badge } from "@/components/ui/badge";
import { FEATURE_CARDS, OFFLINE_FEATURE } from "@/config/features";

export function FeatureGridSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-head text-2xl sm:text-3xl">More than the files</h2>
        <p className="text-muted-foreground text-sm">
          The rest of the site, one click away.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-4">
          <SearchFeatureTile />
        </div>

        <div className="lg:col-span-2">
          <FeatureTile
            color={OFFLINE_FEATURE.color}
            description={OFFLINE_FEATURE.description}
            icon={OFFLINE_FEATURE.icon}
            title={OFFLINE_FEATURE.title}
          >
            <ul className="flex flex-wrap gap-2">
              {OFFLINE_FEATURE.points.map((point) => (
                <li key={point}>
                  <Badge variant="outline">{point}</Badge>
                </li>
              ))}
            </ul>
          </FeatureTile>
        </div>

        <div className="lg:col-span-3">
          <GpaFeatureTile />
        </div>

        <div className="lg:col-span-3">
          <PlanFeatureTile />
        </div>

        {FEATURE_CARDS.map((item) => (
          <div className="lg:col-span-2" key={item.to}>
            <FeatureLinkCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
