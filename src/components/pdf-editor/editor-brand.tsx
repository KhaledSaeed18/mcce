import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/logo-mark";
import { SITE_NAME } from "@/config/site";

const BRAND_CLASSES =
  "grid size-8 shrink-0 place-items-center rounded border-2 bg-card shadow-sm transition duration-200 hover:bg-primary hover:shadow-md active:shadow-none";

/** Just the mark, so the file bar's middle is left to the tabs. */
export function EditorBrand() {
  return (
    <Link
      aria-label={`${SITE_NAME} home`}
      className={BRAND_CLASSES}
      title={`${SITE_NAME} home`}
      to="/"
    >
      <LogoMark className="size-5" />
    </Link>
  );
}
