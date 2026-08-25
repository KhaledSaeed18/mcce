import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { TuitionStackMark } from "@/components/tuition/tuition-stack-mark";
import { PROGRAM_OFFICIAL_URL } from "@/config/site";
import { TUITION_OFFICIAL_PAGE_URL } from "@/config/tuition";

export function TuitionHero() {
  return (
    <PageHero
      badge="TUITION AND FEES"
      decoration={
        <PageHeroMotion width="w-32">
          <TuitionStackMark />
        </PageHeroMotion>
      }
      description="Official tuition references for MCCE, plus a calculator for the credits you plan to take in each semester of the year."
      highlight="with a year planner."
      title="Tuition details,"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <a
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary"
          href={TUITION_OFFICIAL_PAGE_URL}
          rel="noopener"
          target="_blank"
        >
          Official tuition page
          <ExternalLinkIcon className="size-3.5" />
        </a>

        <a
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary"
          href={PROGRAM_OFFICIAL_URL}
          rel="noopener"
          target="_blank"
        >
          School of Engineering page for more info
          <ExternalLinkIcon className="size-3.5" />
        </a>

        <Link
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary"
          to="/plan-of-study"
        >
          Plan of study on this site
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </PageHero>
  );
}
