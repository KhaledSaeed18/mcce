import { ArrowUpRightIcon } from "lucide-react";
import { NavEntryAnchor } from "@/components/nav/nav-entry-anchor";
import type { NavEntry } from "@/config/navigation";

const CARD_CLASSES =
  "group/card flex items-start gap-3 rounded border-2 border-transparent p-2 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-border hover:bg-card hover:shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none data-[status=active]:border-border data-[status=active]:bg-card data-[status=active]:shadow-sm";

interface MegaMenuCardProps {
  color: string;
  entry: NavEntry;
}

export function MegaMenuCard({ color, entry }: MegaMenuCardProps) {
  const Icon = entry.icon;

  return (
    <NavEntryAnchor className={CARD_CLASSES} entry={entry}>
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black transition-transform duration-200 group-hover/card:-rotate-6"
        style={{ backgroundColor: `var(--${color})` }}
      >
        <Icon className="size-4 text-black" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="flex items-center gap-1 font-head text-sm">
          {entry.label}
          {"href" in entry ? (
            <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
          ) : null}
        </span>
        <span className="text-muted-foreground text-xs leading-snug">
          {entry.description}
        </span>
      </span>
    </NavEntryAnchor>
  );
}
