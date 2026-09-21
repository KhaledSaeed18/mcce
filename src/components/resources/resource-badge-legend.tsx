import { ResourceBadge } from "@/components/resources/resource-badge";
import {
  BADGE_FILTER_EXPLANATIONS,
  BADGE_FILTERS,
} from "@/config/resources/badges";
import { BADGE_LEGEND_ID, BADGE_LEGEND_TITLE } from "@/config/resources/copy";

/** One line per badge, so a reader never has to guess what Freemium or Open Source means here. */
export function ResourceBadgeLegend() {
  return (
    <section className="flex scroll-mt-20 flex-col gap-4" id={BADGE_LEGEND_ID}>
      <h2
        className="border-b-2 pb-2 font-head text-lg sm:text-xl"
        tabIndex={-1}
      >
        {BADGE_LEGEND_TITLE}
      </h2>
      <dl className="grid gap-3 sm:grid-cols-2">
        {BADGE_FILTERS.map((badge) => (
          <div
            className="flex items-start gap-3 rounded-lg border-2 bg-card p-3 shadow-sm"
            key={badge}
          >
            <dt className="shrink-0 pt-0.5">
              <ResourceBadge badge={badge} />
            </dt>
            <dd className="text-muted-foreground text-sm">
              {BADGE_FILTER_EXPLANATIONS[badge]}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
