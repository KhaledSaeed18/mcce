import { createFileRoute } from "@tanstack/react-router";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { JsonLd } from "@/components/seo/json-ld";
import { ThesisChapters } from "@/components/thesis/thesis-chapters";
import { ThesisFacts } from "@/components/thesis/thesis-facts";
import { ThesisFirstMeeting } from "@/components/thesis/thesis-first-meeting";
import { ThesisGuideFooter } from "@/components/thesis/thesis-guide-footer";
import { ThesisGuideJump } from "@/components/thesis/thesis-guide-jump";
import { ThesisHero } from "@/components/thesis/thesis-hero";
import { ThesisNonTechnical } from "@/components/thesis/thesis-non-technical";
import { ThesisParts } from "@/components/thesis/thesis-parts";
import { ThesisSlr } from "@/components/thesis/thesis-slr";
import { ThesisTemplateRules } from "@/components/thesis/thesis-template-rules";
import { ThesisTopic } from "@/components/thesis/thesis-topic";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { THESIS_GUIDE_PATH } from "@/config/thesis";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

const THESIS_GUIDE_URL = `${SITE_URL}${THESIS_GUIDE_PATH}`;

export const Route = createFileRoute("/thesis")({
  component: ThesisGuidePage,
  head: () => ({
    links: [{ href: THESIS_GUIDE_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "The MCCE master thesis at LIU: CENG695A and CENG695B, eligibility, Part A and Part B deliverables and grading, the eight template chapters, topic selection, and the systematic literature review.",
      title: formatPageTitle("Master Thesis Guide", SITE_NAME),
      url: THESIS_GUIDE_URL,
    }),
  }),
});

function ThesisGuidePage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <ThesisHero />
      <ThesisGuideJump />
      <ThesisFacts />
      <ThesisParts />
      <ThesisChapters />
      <ThesisNonTechnical />
      <SectionDividerDots />
      <ThesisTopic />
      <ThesisSlr />
      <ThesisFirstMeeting />
      <SectionDividerDots />
      <ThesisTemplateRules />
      <ThesisGuideFooter />

      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Thesis guide", url: THESIS_GUIDE_URL },
        ])}
      />
    </main>
  );
}
