import { Link } from "@tanstack/react-router";
import { ExternalLinkIcon } from "lucide-react";
import { FOOTER_NAV_COLUMNS, type FooterNavLink } from "@/config/footer";

const LINK_CLASSES =
  "inline-flex items-center gap-1 rounded border-2 border-transparent px-1.5 py-0.5 text-sm transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-border hover:bg-muted hover:shadow-sm active:translate-x-0.5 active:translate-y-0.5";

function FooterNavItem({ link }: { link: FooterNavLink }) {
  if ("href" in link) {
    return (
      <a
        className={LINK_CLASSES}
        href={link.href}
        rel="noopener"
        target="_blank"
      >
        {link.label}
        <ExternalLinkIcon className="size-3.5" data-icon="inline-end" />
      </a>
    );
  }

  if (link.to === "/browse/$folderId") {
    return (
      <Link
        className={LINK_CLASSES}
        params={{ folderId: link.folderId }}
        to={link.to}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <Link className={LINK_CLASSES} hash={link.hash} to={link.to}>
      {link.label}
    </Link>
  );
}

export function FooterNav() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      {FOOTER_NAV_COLUMNS.map((column) => (
        <nav
          aria-label={column.title}
          className="flex flex-col gap-3"
          key={column.title}
        >
          <h3 className="font-head text-xs uppercase tracking-wide">
            {column.title}
          </h3>
          <ul className="flex flex-col gap-1">
            {column.links.map((link) => (
              <li key={link.label}>
                <FooterNavItem link={link} />
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}
