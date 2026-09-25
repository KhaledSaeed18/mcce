import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { StudentPerkFacts } from "@/components/resources/student/student-perk-facts";
import { StudentPerkFaq } from "@/components/resources/student/student-perk-faq";
import { StudentPerkHighlights } from "@/components/resources/student/student-perk-highlights";
import { StudentPerkLinks } from "@/components/resources/student/student-perk-links";
import { StudentPerkOffers } from "@/components/resources/student/student-perk-offers";
import { StudentPerkPlans } from "@/components/resources/student/student-perk-plans";
import { StudentPerkSiblings } from "@/components/resources/student/student-perk-siblings";
import { StudentPerkSteps } from "@/components/resources/student/student-perk-steps";
import { JsonLd } from "@/components/seo/json-ld";
import { RESOURCES_STUDENT_PATH } from "@/config/resources/copy";
import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import { studentPerkUrl } from "@/lib/seo/student-perks-head";
import {
  buildStudentPerkHowToSchema,
  buildStudentPerkSchema,
} from "@/lib/seo/student-perks-schema";
import type { StudentPerk } from "@/lib/student-perks/types";

interface StudentPerkDetailPageProps {
  perk: StudentPerk;
}

export function StudentPerkDetailPage({ perk }: StudentPerkDetailPageProps) {
  const url = studentPerkUrl(perk.id);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
      <Link
        className="inline-flex w-fit items-center gap-1.5 rounded border-2 bg-card px-3 py-1.5 font-head text-sm shadow-sm transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
        to={RESOURCES_STUDENT_PATH}
      >
        <ArrowLeftIcon aria-hidden="true" className="size-4" />
        All student plans
      </Link>
      <ResourcesHero
        badge="STUDENT PLAN"
        description={`${perk.name}: ${perk.tagline} ${perk.description}`}
        highlight={perk.shortValue}
        title={perk.name}
      >
        <StudentPerkFacts perk={perk} />
        <div className="flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-1.5 rounded border-2 border-black bg-primary px-4 py-2 font-head text-sm shadow-sm transition hover:-translate-y-0.5"
            href={perk.applyUrl}
            rel="noopener"
            target="_blank"
          >
            {perk.applyLabel}
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </a>
          <a
            className="inline-flex items-center gap-1.5 rounded border-2 bg-card px-4 py-2 font-head text-sm shadow-sm transition hover:-translate-y-0.5"
            href={perk.docsUrl}
            rel="noopener"
            target="_blank"
          >
            Official terms
            <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          </a>
        </div>
        {perk.cardNote ? (
          <p className="text-muted-foreground text-sm">{perk.cardNote}</p>
        ) : null}
      </ResourcesHero>

      <StudentPerkHighlights perk={perk} />
      <StudentPerkOffers perk={perk} />
      <StudentPerkPlans perk={perk} />
      <StudentPerkSteps perk={perk} />

      <StudentPerkLinks perk={perk} />

      <StudentPerkFaq perk={perk} />

      <SectionDividerDots />

      <StudentPerkSiblings perk={perk} />

      <JsonLd data={buildStudentPerkSchema(perk, url)} />
      <JsonLd data={buildStudentPerkHowToSchema(perk, url)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: SITE_NAME, url: SITE_URL },
          { name: "Tools", url: `${SITE_URL}/resources` },
          {
            name: "Student plans",
            url: `${SITE_URL}${RESOURCES_STUDENT_PATH}`,
          },
          { name: perk.name, url },
        ])}
      />
    </main>
  );
}
