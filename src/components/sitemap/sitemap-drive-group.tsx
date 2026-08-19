import { ExternalLinkIcon } from "lucide-react";
import { DriveGlyph } from "@/components/drive/drive-glyph";
import {
  SITEMAP_CARD_CLASSES,
  SitemapCardBody,
} from "@/components/sitemap/sitemap-card-body";
import { SitemapSectionHeading } from "@/components/sitemap/sitemap-section-heading";
import { DRIVE_DIRECT_LINKS, DRIVE_DIRECT_NOTE } from "@/config/drive-links";
import { SITEMAP_DRIVE_GROUP } from "@/config/sitemap";

export function SitemapDriveGroup() {
  const { color, icon, label } = SITEMAP_DRIVE_GROUP;

  return (
    <section className="flex flex-col gap-3">
      <SitemapSectionHeading
        color={color}
        count={DRIVE_DIRECT_LINKS.length}
        countLabel="links"
        icon={icon}
        label={label}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DRIVE_DIRECT_LINKS.map((link) => (
          <a
            className={SITEMAP_CARD_CLASSES}
            href={link.href}
            key={link.id}
            rel="noopener"
            target="_blank"
          >
            <SitemapCardBody
              description={`Opens ${link.driveLabel} in Google Drive, outside this site.`}
              icon={<DriveGlyph className="size-3.5" />}
              label={link.label}
              trailingIcon={<ExternalLinkIcon className="size-3.5" />}
            />
          </a>
        ))}
      </div>

      <p className="text-muted-foreground text-xs">{DRIVE_DIRECT_NOTE}</p>
    </section>
  );
}
