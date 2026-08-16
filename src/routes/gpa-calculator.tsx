import { createFileRoute } from "@tanstack/react-router";
import { GpaEntryGrid } from "@/components/gpa/gpa-entry-grid";
import { GpaExportCard } from "@/components/gpa/gpa-export-card";
import { GpaHero } from "@/components/gpa/gpa-hero";
import { GpaProjection } from "@/components/gpa/gpa-projection";
import { GpaScaleTable } from "@/components/gpa/gpa-scale-table";
import { GpaStandingSummary } from "@/components/gpa/gpa-standing-summary";
import { GpaStorageNote } from "@/components/gpa/gpa-storage-note";
import { GpaTargetPanel } from "@/components/gpa/gpa-target-panel";
import { GpaTrendCard } from "@/components/gpa/gpa-trend-card";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { SITE_URL } from "@/config/site";
import { useGpaAverages } from "@/hooks/use-gpa-averages";
import { useGpaResults } from "@/hooks/use-gpa-results";
import { buildPageMeta } from "@/lib/seo/meta";

const GPA_CALCULATOR_URL = `${SITE_URL}/gpa-calculator`;

export const Route = createFileRoute("/gpa-calculator")({
  component: GpaCalculatorPage,
  head: () => ({
    links: [{ href: GPA_CALCULATOR_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Calculate semester and cumulative GPA for the LIU MCCE program on the official 4.0 scale, project your final GPA, and find the course average needed to hit a target.",
      title: "GPA Calculator · MCCE",
      url: GPA_CALCULATOR_URL,
    }),
  }),
});

function GpaCalculatorPage() {
  const { averages, reset, setAverage, setTargetGpa, targetGpa } =
    useGpaAverages();
  const {
    cumulative,
    projection,
    semesterTotals,
    semesters,
    target,
    trendPoints,
  } = useGpaResults(averages, targetGpa);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <GpaHero />
      <GpaStandingSummary cumulative={cumulative} />

      <GpaEntryGrid
        onAverageChange={setAverage}
        onReset={reset}
        semesters={semesters}
        totals={semesterTotals}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <GpaTrendCard points={trendPoints} />
        <GpaProjection cumulativeGpa={cumulative.gpa} projection={projection} />
        <GpaTargetPanel
          onTargetChange={setTargetGpa}
          outcome={target}
          targetGpa={targetGpa}
        />
      </div>

      <SectionDividerDots />

      <div className="grid gap-4 lg:grid-cols-2">
        <GpaExportCard
          cumulative={cumulative}
          projection={projection}
          semesters={semesters}
          target={target}
          targetGpa={targetGpa}
          trend={trendPoints}
        />
        <div className="flex flex-col gap-4">
          <GpaScaleTable />
          <GpaStorageNote />
        </div>
      </div>
    </main>
  );
}
