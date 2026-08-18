import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  SITEMAP_CARD_CLASSES,
  SitemapCardBody,
} from "@/components/sitemap/sitemap-card-body";
import { SitemapSectionHeading } from "@/components/sitemap/sitemap-section-heading";
import type { SitemapEntry } from "@/config/sitemap";

interface SitemapGroupProps {
  color: string;
  entries: SitemapEntry[];
  icon: LucideIcon;
  label: string;
}

export function SitemapGroup({
  color,
  entries,
  icon,
  label,
}: SitemapGroupProps) {
  return (
    <section className="flex flex-col gap-3">
      <SitemapSectionHeading
        color={color}
        count={entries.length}
        icon={icon}
        label={label}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link className={SITEMAP_CARD_CLASSES} key={entry.to} to={entry.to}>
            <SitemapCardBody
              description={entry.description}
              label={entry.label}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
