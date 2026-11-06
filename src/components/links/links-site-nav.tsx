import { Link } from "@tanstack/react-router";
import { LINKS_SITE_ENTRIES, LINKS_SITE_HEADING } from "@/config/links";

export function LinksSiteNav() {
  return (
    <nav aria-labelledby="links-site-heading" className="flex flex-col gap-3">
      <h2 className="font-head text-base" id="links-site-heading">
        {LINKS_SITE_HEADING}
      </h2>

      <ul className="grid grid-cols-2 gap-2">
        {LINKS_SITE_ENTRIES.map(({ icon: Icon, label, to }) => (
          <li key={to}>
            <Link
              className="bg-card lift-hit-area hover:bg-accent flex h-full min-h-11 items-center gap-2 rounded border-2 px-2.5 py-2 text-sm leading-tight font-medium shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              to={to}
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
