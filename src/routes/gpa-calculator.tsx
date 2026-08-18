import { createFileRoute } from "@tanstack/react-router";
import { GpaEntryGrid } from "@/components/gpa/gpa-entry-grid";
import { GpaHero } from "@/components/gpa/gpa-hero";
import { GpaInsightGrid } from "@/components/gpa/gpa-insight-grid";
import { GpaResourcesGrid } from "@/components/gpa/gpa-resources-grid";
import { GpaSharedLinkDialog } from "@/components/gpa/gpa-shared-link-dialog";
import { GpaStandingSummary } from "@/components/gpa/gpa-standing-summary";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { GPA_CALCULATOR_PATH, GPA_SHARE_PARAM } from "@/config/gpa";
import { SITE_URL } from "@/config/site";
import { useGpaAverages } from "@/hooks/use-gpa-averages";
import { useGpaLinkImport } from "@/hooks/use-gpa-link-import";
import { useGpaResults } from "@/hooks/use-gpa-results";
import { toShareSearch } from "@/lib/gpa/share/search";
import { buildPageMeta } from "@/lib/seo/meta";

const GPA_CALCULATOR_URL = `${SITE_URL}${GPA_CALCULATOR_PATH}`;

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
  validateSearch: toShareSearch,
});

function GpaCalculatorPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { averages, reset, setAverage, setAverages, setTargetGpa, targetGpa } =
    useGpaAverages();
  const results = useGpaResults(averages, targetGpa);
  const { apply, dismiss, grades, hasLink } = useGpaLinkImport({
    navigate,
    onApply: setAverages,
    value: search[GPA_SHARE_PARAM],
  });

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <GpaHero />
      <GpaStandingSummary cumulative={results.cumulative} />

      <GpaEntryGrid
        onAverageChange={setAverage}
        onReset={reset}
        semesters={results.semesters}
        totals={results.semesterTotals}
      />

      <GpaInsightGrid
        onTargetChange={setTargetGpa}
        results={results}
        targetGpa={targetGpa}
      />

      <SectionDividerDots />

      <GpaResourcesGrid results={results} targetGpa={targetGpa} />

      {hasLink ? (
        <GpaSharedLinkDialog
          grades={grades}
          onApply={apply}
          onDismiss={dismiss}
        />
      ) : null}
    </main>
  );
}
