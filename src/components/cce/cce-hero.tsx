import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { CceTracksMark } from "@/components/cce/cce-tracks-mark";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { TextLink } from "@/components/text-link";
import { CCE_OFFICIAL_UNDERGRADUATE_URL } from "@/config/cce/content";
import { PROGRAM_SCHOOL_URL } from "@/config/site";

export function CceHero() {
  return (
    <PageHero
      badge="LIU CCE UNDERGRADUATE PROGRAMS"
      decoration={
        <PageHeroMotion width="w-32">
          <CceTracksMark />
        </PageHeroMotion>
      }
      description="The two bachelor programs in the LIU Department of Computer and Communications Engineering, Computer Engineering (CENG) and Communications Engineering (TENG), on one page: 108 credits, three years, the full plan of study, and every prerequisite."
      highlight="on one page."
      title="LIU CCE bachelor,"
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <TextLink href={CCE_OFFICIAL_UNDERGRADUATE_URL}>
          Official undergraduate programs page
        </TextLink>

        <TextLink href={PROGRAM_SCHOOL_URL}>LIU School of Engineering</TextLink>

        <Link
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary"
          to="/plan-of-study"
        >
          MCCE master's plan of study
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </PageHero>
  );
}
