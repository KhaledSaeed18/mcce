import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";
import { SectionDividerDots } from "@/components/marketing/section-divider-dots";
import { ResourcesHero } from "@/components/resources/resources-hero";
import { StudentPerkFacts } from "@/components/resources/student/student-perk-facts";
import { StudentPerkFaq } from "@/components/resources/student/student-perk-faq";
import { StudentPerkHighlights } from "@/components/resources/student/student-perk-highlights";
import { StudentPerkOffers } from "@/components/resources/student/student-perk-offers";
import { StudentPerkPlans } from "@/components/resources/student/student-perk-plans";
import { StudentPerkSteps } from "@/components/resources/student/student-perk-steps";
import { JsonLd } from "@/components/seo/json-ld";
import { RESOURCES_STUDENT_PATH } from "@/config/resources/copy";
import { STUDENT_PERKS } from "@/config/resources/student-perks";
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
  const others = STUDENT_PERKS.filter((item) => item.id !== perk.id);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 p-4 py-8 sm:p-6 sm:py-14">
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
        {perk.cardRequired ? (
          <p className="text-muted-foreground text-sm">
            Card required at signup. A temporary 1 USD hold may show during
            verification. Renewal is paid unless cancelled.
          </p>
        ) : null}
      </ResourcesHero>

      <StudentPerkHighlights perk={perk} />
      <StudentPerkOffers perk={perk} />
      <StudentPerkPlans perk={perk} />
      <StudentPerkSteps perk={perk} />

      <section aria-labelledby="links" className="flex flex-col gap-3">
        <h2 className="font-head text-2xl" id="links">
          Official links
        </h2>
        <ul className="flex flex-col gap-2 text-sm">
          <li>
            <a
              className="underline underline-offset-4 hover:text-primary"
              href={perk.applyUrl}
              rel="noopener"
              target="_blank"
            >
              {perk.applyLabel}
            </a>
          </li>
          <li>
            <a
              className="underline underline-offset-4 hover:text-primary"
              href={perk.docsUrl}
              rel="noopener"
              target="_blank"
            >
              Terms and eligibility
            </a>
          </li>
          {perk.allOffers ? (
            <li>
              <a
                className="underline underline-offset-4 hover:text-primary"
                href={perk.allOffers.href}
                rel="noopener"
                target="_blank"
              >
                {perk.allOffers.label}
              </a>
              <span className="text-muted-foreground">
                {" "}
                ({perk.allOffers.note})
              </span>
            </li>
          ) : null}
          {perk.supportUrl ? (
            <li>
              <a
                className="underline underline-offset-4 hover:text-primary"
                href={perk.supportUrl}
                rel="noopener"
                target="_blank"
              >
                Support page
              </a>
            </li>
          ) : null}
          {perk.supportEmail ? (
            <li>
              <a
                className="underline underline-offset-4 hover:text-primary"
                href={`mailto:${perk.supportEmail}`}
              >
                {perk.supportEmail}
              </a>
            </li>
          ) : null}
        </ul>
      </section>

      <StudentPerkFaq perk={perk} />

      <SectionDividerDots />

      <nav aria-label="Other student plans" className="flex flex-col gap-3">
        <h2 className="font-head text-2xl">The other two</h2>
        <div className="flex flex-wrap gap-3">
          {others.map((item) => (
            <Link
              className="inline-flex items-center gap-1.5 rounded border-2 bg-card px-3 py-2 font-head text-sm shadow-sm transition hover:-translate-y-0.5"
              key={item.id}
              params={{ perkId: item.id }}
              to="/resources/student/$perkId"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          className="inline-flex w-fit items-center gap-1.5 text-sm underline underline-offset-4 hover:text-primary"
          to={RESOURCES_STUDENT_PATH}
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          All student plans
        </Link>
      </nav>

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
