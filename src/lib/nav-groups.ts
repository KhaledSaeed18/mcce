import { NAV_GROUPS, type NavEntry } from "@/config/navigation";

function matchesEntry(entry: NavEntry, pathname: string) {
  if ("href" in entry) {
    return false;
  }
  if (entry.to === "/browse/$folderId") {
    return pathname.startsWith("/browse");
  }
  if (entry.to === "/") {
    return pathname === "/";
  }
  return pathname === entry.to || pathname.startsWith(`${entry.to}/`);
}

/** Which top-level group owns the current page, so its trigger can read as active. */
export function findActiveNavGroupValue(pathname: string): string | null {
  const group = NAV_GROUPS.find((candidate) =>
    candidate.entries.some((entry) => matchesEntry(entry, pathname))
  );
  return group?.value ?? null;
}
