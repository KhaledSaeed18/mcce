import { ArrowUpRightIcon } from "lucide-react";
import { NavEntryAnchor } from "@/components/nav/nav-entry-anchor";
import type { NavEntry } from "@/config/navigation";

const ROW_CLASSES =
  "flex items-center gap-3 rounded border-2 border-transparent px-2 py-2.5 transition duration-200 active:translate-x-0.5 active:translate-y-0.5 data-[status=active]:border-border data-[status=active]:bg-card data-[status=active]:shadow-sm";

interface MobileNavRowProps {
  color: string;
  entry: NavEntry;
  onNavigate: () => void;
}

export function MobileNavRow({ color, entry, onNavigate }: MobileNavRowProps) {
  const Icon = entry.icon;

  return (
    <NavEntryAnchor
      className={ROW_CLASSES}
      entry={entry}
      onNavigate={onNavigate}
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded border-2 border-black"
        style={{ backgroundColor: `var(--${color})` }}
      >
        <Icon className="size-4 text-black" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="flex items-center gap-1 font-head text-base">
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
