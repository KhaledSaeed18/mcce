import { ArrowUpRightIcon } from "lucide-react";
import { DriveGlyph } from "@/components/drive/drive-glyph";
import { DRIVE_DIRECT_ACTION } from "@/config/drive-links";
import { cn } from "@/lib/utils";

const BUTTON_CLASSES =
  "group inline-flex h-8 shrink-0 items-center gap-1.5 rounded border-2 bg-card px-2.5 font-head text-xs shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:text-sm";

interface OpenInDriveButtonProps {
  className?: string;
  href: string;
  label?: string;
}

export function OpenInDriveButton({
  className,
  href,
  label = DRIVE_DIRECT_ACTION,
}: OpenInDriveButtonProps) {
  return (
    <a
      className={cn(BUTTON_CLASSES, className)}
      href={href}
      rel="noopener"
      target="_blank"
    >
      <DriveGlyph className="size-3.5" />
      {label}
      <ArrowUpRightIcon className="size-3.5 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
