import { Link } from "@tanstack/react-router";
import {
  SITEMAP_CARD_CLASSES,
  SitemapCardBody,
} from "@/components/sitemap/sitemap-card-body";
import { SitemapSectionHeading } from "@/components/sitemap/sitemap-section-heading";
import { SITEMAP_BROWSE_GROUP } from "@/config/sitemap";

export function SitemapBrowseGroup() {
  const { color, entries, icon, label } = SITEMAP_BROWSE_GROUP;

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
          <Link
            className={SITEMAP_CARD_CLASSES}
            key={entry.folderId}
            params={{ folderId: entry.folderId }}
            to="/browse/$folderId"
          >
            <SitemapCardBody
              description={entry.description}
              label={entry.label}
            />
          </Link>
        ))}
      </div>

      <p className="text-muted-foreground text-xs">
        Each folder page links on to the folders inside it, all the way down to
        the files. Search covers the same material without the walk.
      </p>
    </section>
  );
}
