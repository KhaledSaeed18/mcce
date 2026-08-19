import { ArrowUpRightIcon } from "lucide-react";
import { DriveGlyph } from "@/components/drive/drive-glyph";
import { DRIVE_DIRECT_LINKS } from "@/config/drive-links";
import { FOOTER_DRIVE_TITLE } from "@/config/footer";

const DRIVE_LINK_CLASSES =
  "group inline-flex items-center gap-1.5 rounded border-2 border-border bg-card px-2 py-1 font-head text-muted-foreground text-xs shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-black hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

export function FooterDriveLinks() {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-head text-xs uppercase tracking-wide">
        {FOOTER_DRIVE_TITLE}
      </h3>

      <ul className="flex flex-wrap gap-2">
        {DRIVE_DIRECT_LINKS.map((link) => (
          <li key={link.id}>
            <a
              className={DRIVE_LINK_CLASSES}
              href={link.href}
              rel="noopener"
              target="_blank"
            >
              <DriveGlyph className="size-3.5" />
              {link.driveLabel}
              <ArrowUpRightIcon className="size-3 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
