import { ArrowRightIcon } from "lucide-react";
import type { ReactNode } from "react";

export const SITEMAP_CARD_CLASSES =
  "group flex flex-col gap-1 rounded border-2 bg-card p-3 shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-sm";

interface SitemapCardBodyProps {
  description: string;
  icon?: ReactNode;
  label: string;
  trailingIcon?: ReactNode;
}

export function SitemapCardBody({
  description,
  icon,
  label,
  trailingIcon,
}: SitemapCardBodyProps) {
  return (
    <>
      <span className="flex items-center gap-1.5 font-head text-sm">
        {icon}
        {label}
        {trailingIcon ?? (
          <ArrowRightIcon className="size-3.5 transition group-hover:translate-x-0.5" />
        )}
      </span>
      <span className="text-muted-foreground text-xs">{description}</span>
    </>
  );
}
