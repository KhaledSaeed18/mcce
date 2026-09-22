import { m } from "motion/react";
import { AdmissionsFeatureTile } from "@/components/marketing/admissions-feature-tile";
import { EditorFeatureTile } from "@/components/marketing/editor-feature-tile";
import { FeatureTile } from "@/components/marketing/feature-tile";
import { GpaFeatureTile } from "@/components/marketing/gpa-feature-tile";
import { PlanFeatureTile } from "@/components/marketing/plan-feature-tile";
import { SearchFeatureTile } from "@/components/marketing/search-feature-tile";
import { TuitionFeatureTile } from "@/components/marketing/tuition-feature-tile";
import { Badge } from "@/components/ui/badge";
import { OFFLINE_FEATURE } from "@/config/features";
import { useReveal } from "@/hooks/use-reveal";

export function FeatureGridSection() {
  const reveal = useReveal();

  return (
    <section className="flex flex-col gap-6">
      <m.div className="flex flex-col gap-1" {...reveal.single}>
        <h2 className="font-head text-2xl sm:text-3xl">More than the files</h2>
        <p className="text-muted-foreground text-sm">
          The rest of the site, one click away.
        </p>
      </m.div>

      <m.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
        {...reveal.group}
      >
        <m.div className="lg:col-span-4" {...reveal.item}>
          <SearchFeatureTile />
        </m.div>

        <m.div className="lg:col-span-2" {...reveal.item}>
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
        </m.div>

        <m.div className="lg:col-span-3" {...reveal.item}>
          <GpaFeatureTile />
        </m.div>

        <m.div className="lg:col-span-3" {...reveal.item}>
          <PlanFeatureTile />
        </m.div>

        <m.div className="lg:col-span-2" {...reveal.item}>
          <AdmissionsFeatureTile />
        </m.div>

        <m.div className="lg:col-span-4" {...reveal.item}>
          <TuitionFeatureTile />
        </m.div>

        <m.div className="sm:col-span-2 lg:col-span-6" {...reveal.item}>
          <EditorFeatureTile />
        </m.div>
      </m.div>
    </section>
  );
}
