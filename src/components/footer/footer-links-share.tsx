import { Link } from "@tanstack/react-router";
import { ArrowRightIcon, Link2Icon } from "lucide-react";
import { LinksShareButton } from "@/components/links/links-share-button";
import { buttonVariants } from "@/components/ui/button";
import {
  FOOTER_SHARE_OPEN_LABEL,
  FOOTER_SHARE_SUBTITLE,
  FOOTER_SHARE_TITLE,
} from "@/config/footer";
import { LINKS_DISPLAY_HOST, LINKS_PATH } from "@/config/links";
import { cn } from "@/lib/utils";

export function FooterLinksShare() {
  return (
    <section
      aria-label={FOOTER_SHARE_TITLE}
      className="bg-muted/60 flex flex-col gap-4 rounded border-2 border-dashed p-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex min-w-0 items-start gap-3">
        <span
          aria-hidden="true"
          className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded border-2 border-black shadow-sm"
        >
          <Link2Icon className="size-4" />
        </span>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="font-head text-sm">{FOOTER_SHARE_TITLE}</h3>
          <p className="text-muted-foreground text-xs text-pretty sm:text-sm">
            {FOOTER_SHARE_SUBTITLE}
          </p>
          <p className="font-head mt-1 text-xs break-all select-all">
            <span className="text-muted-foreground">{LINKS_DISPLAY_HOST}</span>
            <span className="text-primary">{LINKS_PATH}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:shrink-0 md:flex-nowrap">
        <LinksShareButton />
        <Link
          className={cn(buttonVariants({ size: "sm" }), "h-8")}
          to={LINKS_PATH}
        >
          {FOOTER_SHARE_OPEN_LABEL}
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
