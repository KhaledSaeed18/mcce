import { Link } from "@tanstack/react-router";
import { LinksShareButton } from "@/components/links/links-share-button";
import { LogoMark } from "@/components/logo-mark";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { LINKS_TITLE, LINKS_TITLE_HIGHLIGHT } from "@/config/links";
import {
  PROGRAM_NAME,
  PROGRAM_UNIVERSITY_SHORT,
  SITE_NAME,
} from "@/config/site";

export function LinksIntro() {
  return (
    <header className="flex flex-col gap-5 lg:gap-8">
      <div className="flex items-center justify-between gap-3">
        <Link className="group flex items-center gap-2" to="/">
          <LogoMark className="size-9" />
          <span className="font-head text-xl">{SITE_NAME}</span>
        </Link>

        <div className="flex items-center gap-2">
          <LinksShareButton />
          <ThemeSwitcher />
        </div>
      </div>

      <div className="flex flex-col gap-2 lg:gap-4">
        <h1 className="font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-6xl">
          {LINKS_TITLE}
          <br />
          <span className="text-primary">{LINKS_TITLE_HIGHLIGHT}</span>
        </h1>
        <p className="text-muted-foreground text-sm text-pretty sm:text-base lg:text-lg">
          {PROGRAM_UNIVERSITY_SHORT} {PROGRAM_NAME}
        </p>
      </div>
    </header>
  );
}
