import { ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import type { ContactLink } from "@/config/contact";

interface ContactLinkCardProps {
  link: ContactLink;
}

export function ContactLinkCard({ link }: ContactLinkCardProps) {
  const Icon = link.icon;
  const TrailingIcon = link.external ? ExternalLinkIcon : ArrowRightIcon;

  return (
    <a
      className="group flex items-center gap-4 rounded border-2 bg-card p-4 shadow-md transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-lg active:translate-x-1 active:translate-y-1 active:shadow-none sm:p-5"
      href={link.href}
      rel={link.external ? "noopener" : undefined}
      target={link.external ? "_blank" : undefined}
    >
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded border-2 border-black"
        style={{ backgroundColor: `var(--${link.color})` }}
      >
        <Icon className="size-5 text-black" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
          {link.eyebrow}
        </span>
        <span className="truncate font-head text-sm sm:text-base">
          {link.value}
        </span>
        <span className="text-muted-foreground text-xs sm:text-sm">
          {link.description}
        </span>
      </span>

      <TrailingIcon className="size-4 shrink-0 text-muted-foreground transition duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}
