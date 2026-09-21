import type { ReactNode } from "react";
import { PageHero } from "@/components/marketing/page-hero";
import { PageHeroMotion } from "@/components/marketing/page-hero-motion";
import { ResourcesMark } from "@/components/resources/resources-mark";

interface ResourcesHeroProps {
  badge: string;
  children?: ReactNode;
  description: string;
  highlight: string;
  title: string;
}

/** Shared by the tools, thesis, and open source pages; only the copy differs. */
export function ResourcesHero({
  badge,
  children,
  description,
  highlight,
  title,
}: ResourcesHeroProps) {
  return (
    <PageHero
      badge={badge}
      decoration={
        <PageHeroMotion width="w-40">
          <ResourcesMark />
        </PageHeroMotion>
      }
      description={description}
      highlight={highlight}
      title={title}
    >
      {children}
    </PageHero>
  );
}
