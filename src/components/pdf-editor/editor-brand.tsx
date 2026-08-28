import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/logo-mark";
import { EDITOR_BRAND_LABEL } from "@/config/pdf-editor";
import { SITE_NAME } from "@/config/site";

const BRAND_CLASSES =
  "group flex items-center gap-2 rounded border-2 bg-card py-1 pr-3 pl-2 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-y-0 active:shadow-none";

export function EditorBrand() {
  return (
    <Link aria-label={`${SITE_NAME} home`} className={BRAND_CLASSES} to="/">
      <LogoMark className="size-5" />
      <span className="font-head text-sm leading-none">{SITE_NAME}</span>
      <span className="h-4 w-px bg-border" />
      <span className="font-head text-[0.65rem] text-muted-foreground uppercase leading-none tracking-[0.18em] transition-colors duration-200 group-hover:text-primary-foreground">
        {EDITOR_BRAND_LABEL}
      </span>
    </Link>
  );
}
