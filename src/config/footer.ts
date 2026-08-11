import { PROGRAM_OFFICIAL_URL } from "@/config/site";
import { DRIVE_SOURCES } from "@/config/sources";

export type FooterNavLink =
  | { hash?: string; label: string; to: "/" | "/search" }
  | { folderId: string; label: string; to: "/browse/$folderId" }
  | { href: string; label: string };

export interface FooterNavColumn {
  links: FooterNavLink[];
  title: string;
}

export const FOOTER_TAGLINE =
  "Independent index of MCCE program materials: lectures, exams, slides, and recordings from both years.";

export const FOOTER_DISCLAIMER =
  "Independent index of program materials. Not affiliated with or an official page of LIU.";

export const FOOTER_COPYRIGHT = "© 2026 MCCE";

export const FOOTER_NAV_COLUMNS: FooterNavColumn[] = [
  {
    links: [
      { label: "Homepage", to: "/" },
      { label: "Search files", to: "/search" },
      {
        folderId: DRIVE_SOURCES[0].rootFolderId,
        label: "First Year",
        to: "/browse/$folderId",
      },
      {
        folderId: DRIVE_SOURCES[1].rootFolderId,
        label: "Second Year",
        to: "/browse/$folderId",
      },
    ],
    title: "Browse",
  },
  {
    links: [
      { hash: "about", label: "About MCCE", to: "/" },
      { hash: "faq", label: "Program FAQ", to: "/" },
      { href: PROGRAM_OFFICIAL_URL, label: "Official program page" },
    ],
    title: "Program",
  },
];
