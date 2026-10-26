import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { PageHero } from "@/components/marketing/page-hero";
import { RESOURCES_THESIS_PATH } from "@/config/resources/copy";
import { THESIS_PARTS } from "@/config/thesis";

const HERO_LINK_CLASS =
  "inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-primary";

export function ThesisHero() {
  return (
    <PageHero
      badge="MASTER THESIS"
      description="How the MCCE thesis runs at LIU: who can register, what each part must deliver, the template's eight chapters, and how to find a topic and review the literature."
      highlight="over two terms."
      title="One project,"
    >
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {THESIS_PARTS.map((part) => (
          <Link
            className={HERO_LINK_CLASS}
            key={part.code}
            params={{ code: part.code }}
            to="/course/$code"
          >
            {part.code} {part.label}
            <ArrowRightIcon className="size-3.5" />
          </Link>
        ))}
        <Link className={HERO_LINK_CLASS} to={RESOURCES_THESIS_PATH}>
          Thesis toolkit
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </PageHero>
  );
}
