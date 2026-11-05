import { ArrowUpRightIcon } from "lucide-react";
import { DriveGlyph } from "@/components/drive/drive-glyph";
import {
  DRIVE_DIRECT_ACTION,
  type DriveDirectLink,
} from "@/config/drive-links";
import { cn } from "@/lib/utils";

const CARD_CLASSES = cn(
  "group bg-card flex h-full flex-col gap-4 rounded-lg border-2 p-4 shadow-md transition duration-200",
  "lift-hit-area hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none"
);

interface DriveDirectCardProps {
  link: DriveDirectLink;
}

export function DriveDirectCard({ link }: DriveDirectCardProps) {
  return (
    <a className={CARD_CLASSES} href={link.href} rel="noopener" target="_blank">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex size-10 items-center justify-center rounded border-2 border-black bg-white"
          style={{ boxShadow: `4px 4px 0 0 var(--${link.color})` }}
        >
          <DriveGlyph className="size-5" />
        </div>
        <ArrowUpRightIcon className="size-5 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-head text-lg">{link.label}</span>
        <span className="text-muted-foreground font-mono text-xs break-all">
          {link.driveLabel}
        </span>
      </div>

      <span className="border-border font-head group-hover:bg-primary group-hover:text-primary-foreground mt-auto inline-flex w-fit items-center gap-1.5 rounded border-2 px-2 py-0.5 text-xs tracking-wide uppercase transition duration-200 group-hover:border-black">
        {DRIVE_DIRECT_ACTION}
      </span>
    </a>
  );
}
