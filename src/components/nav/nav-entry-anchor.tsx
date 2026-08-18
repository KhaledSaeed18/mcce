import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { NavEntry } from "@/config/navigation";

interface NavEntryAnchorProps {
  children: ReactNode;
  className: string;
  entry: NavEntry;
  onNavigate?: () => void;
}

/** Resolves the three link shapes an entry can take, so the presentational
 * components above it never have to know about routing. */
export function NavEntryAnchor({
  children,
  className,
  entry,
  onNavigate,
}: NavEntryAnchorProps) {
  if ("href" in entry) {
    return (
      <a
        className={className}
        href={entry.href}
        onClick={onNavigate}
        rel="noopener"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  if (entry.to === "/browse/$folderId") {
    return (
      <Link
        className={className}
        onClick={onNavigate}
        params={{ folderId: entry.folderId }}
        to={entry.to}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link className={className} onClick={onNavigate} to={entry.to}>
      {children}
    </Link>
  );
}
