import { DRIVE_SOURCES } from "@/config/sources";

export type NavLink =
  | { label: string; to: "/" | "/about" | "/faq" | "/contact" }
  | { folderId: string; label: string; to: "/browse/$folderId" };

export const NAV_BROWSE_LINKS: NavLink[] = DRIVE_SOURCES.map((source) => ({
  folderId: source.rootFolderId,
  label: source.label,
  to: "/browse/$folderId",
}));

export const NAV_PAGE_LINKS: NavLink[] = [
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
