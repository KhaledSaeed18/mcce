import type { LucideIcon } from "lucide-react";

interface SitemapSectionHeadingProps {
  color: string;
  count: number;
  countLabel?: string;
  icon: LucideIcon;
  label: string;
}

export function SitemapSectionHeading({
  color,
  count,
  countLabel = "pages",
  icon: Icon,
  label,
}: SitemapSectionHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex size-8 items-center justify-center rounded border-2 border-black"
        style={{ backgroundColor: `var(--${color})` }}
      >
        <Icon className="size-4 text-black" />
      </span>
      <h2 className="font-head text-lg sm:text-xl">{label}</h2>
      <span className="text-muted-foreground text-xs">
        {count} {countLabel}
      </span>
    </div>
  );
}
