import { Link } from "@tanstack/react-router";
import { HERO_QUICK_LINKS } from "@/config/hero";

export function HeroQuickLinks() {
  return (
    <nav aria-label="Jump to a section of the site">
      <ul className="flex flex-wrap gap-2">
        {HERO_QUICK_LINKS.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.to}>
              <Link
                className="inline-flex items-center gap-1.5 rounded border-2 bg-card px-2.5 py-1 font-head text-xs shadow-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-md active:translate-x-0 active:translate-y-0 active:shadow-none sm:text-sm"
                to={link.to}
              >
                <Icon className="size-3.5" />
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
