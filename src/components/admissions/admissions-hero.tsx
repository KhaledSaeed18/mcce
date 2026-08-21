import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { PROGRAM_OFFICIAL_POS_URL, PROGRAM_OFFICIAL_URL } from "@/config/site";

export function AdmissionsHero() {
  return (
    <PageHero
      badge="PROGRAM ADMISSIONS"
      description="A clearer summary of the LIU School of Engineering graduate admissions flow for MCCE, with separate tracks for LIU and non-LIU applicants."
      highlight="without the maze."
      title="Admissions steps,"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <a
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary"
          href={PROGRAM_OFFICIAL_URL}
          rel="noopener"
          target="_blank"
        >
          Official graduate page
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

        <a
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary"
          href={PROGRAM_OFFICIAL_POS_URL}
          rel="noopener"
          target="_blank"
        >
          Official plan of study (PDF)
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
