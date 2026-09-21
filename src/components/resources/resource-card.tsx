import { ArrowUpRightIcon } from "lucide-react";
import { ResourceBadge } from "@/components/resources/resource-badge";
import { ResourceIcon } from "@/components/resources/resource-icon";
import {
  ACCOUNT_REQUIRED_NOTE,
  EXPERIMENTAL_NOTE,
  LIU_VERIFICATION_NOTE,
} from "@/config/resources/badges";
import { RESOURCE_CATEGORY_BY_ID } from "@/config/resources/categories";
import { OPENS_IN_NEW_TAB } from "@/config/resources/copy";
import type { ResourceEntry } from "@/lib/resources/types";
import { cn } from "@/lib/utils";

/** Same lift and press as the Drive cards, so the hub reads as part of the site. */
export const RESOURCE_CARD_CLASSES = cn(
  "group flex h-full flex-col gap-3 rounded-lg border-2 bg-card p-4 shadow-md transition duration-200",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg",
  "active:translate-x-1 active:translate-y-1 active:shadow-none",
  "focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
);

interface ResourceCardProps {
  tool: ResourceEntry;
}

export function ResourceCard({ tool }: ResourceCardProps) {
  const category = RESOURCE_CATEGORY_BY_ID.get(tool.category);
  const notes = [
    tool.requiresAccount ? ACCOUNT_REQUIRED_NOTE : null,
    tool.status === "experimental" ? EXPERIMENTAL_NOTE : null,
    tool.note ?? null,
    tool.privacyNote ?? null,
  ].filter((note): note is string => Boolean(note));

  return (
    <a
      className={RESOURCE_CARD_CLASSES}
      href={tool.url}
      rel="noopener"
      target="_blank"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded border-2 border-black bg-white"
          style={{
            boxShadow: `4px 4px 0 0 var(--${category?.color ?? "chart-1"})`,
          }}
        >
          {category ? (
            <ResourceIcon fallbackIcon={category.icon} icon={tool.icon} />
          ) : null}
        </div>
        <ArrowUpRightIcon
          aria-hidden="true"
          className="size-5 shrink-0 transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-head text-lg leading-tight">
          {tool.name}
          <span className="sr-only">, {OPENS_IN_NEW_TAB}</span>
        </h3>
        <p className="text-muted-foreground text-sm">{tool.description}</p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          <ResourceBadge badge={tool.access} />
          {tool.isOpenSource ? <ResourceBadge badge="open-source" /> : null}
        </div>
        {tool.verification === "liu" ? (
          <p className="font-medium text-xs">{LIU_VERIFICATION_NOTE}</p>
        ) : null}
        {notes.length > 0 ? (
          <p className="text-muted-foreground text-xs">{notes.join(" ")}</p>
        ) : null}
      </div>
    </a>
  );
}
