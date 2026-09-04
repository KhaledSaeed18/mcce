import { PROGRAM_OFFICIAL_URL } from "@/config/site";
import { DRIVE_SOURCES } from "@/config/sources";

export type FooterNavLink =
  | {
      hash?: string;
      label: string;
      to:
        | "/"
        | "/admissions"
        | "/tuition-fees"
        | "/plan-of-study"
        | "/gpa-calculator"
        | "/cce"
        | "/course"
        | "/exams"
        | "/recent"
        | "/saved"
        | "/about"
        | "/faq"
        | "/search"
        | "/contact"
        | "/legal"
        | "/sitemap";
    }
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

export const FOOTER_DRIVE_TITLE = "Open in Drive";

export const FOOTER_CONTACT_EMAIL = "uni@khaledsaeed.tech";

export const FOOTER_GITHUB_URL = "https://github.com/KhaledSaeed18/mcce";

export const FOOTER_BUG_REPORT_URL =
  "https://github.com/KhaledSaeed18/mcce/issues/new?template=bug_report.yml";

export const FOOTER_FEATURE_REQUEST_URL =
  "https://github.com/KhaledSaeed18/mcce/issues/new?template=feature_request.yml";

export const FOOTER_NAV_COLUMNS: FooterNavColumn[] = [
  {
    links: [
      { label: "Homepage", to: "/" },
      { label: "Search files", to: "/search" },
      { label: "All courses", to: "/course" },
      { label: "Past exams", to: "/exams" },
      { label: "Recently added", to: "/recent" },
      { label: "Saved", to: "/saved" },
      ...DRIVE_SOURCES.map((source) => ({
        folderId: source.rootFolderId,
        label: source.label,
        to: "/browse/$folderId" as const,
      })),
    ],
    title: "Browse",
  },
  {
    links: [
      { label: "Plan of study", to: "/plan-of-study" },
      { label: "GPA calculator", to: "/gpa-calculator" },
      { label: "Tuition and fees", to: "/tuition-fees" },
      { label: "About MCCE", to: "/about" },
      { label: "CCE undergraduate programs", to: "/cce" },
      { label: "Admissions guide", to: "/admissions" },
      { label: "FAQ", to: "/faq" },
      { href: PROGRAM_OFFICIAL_URL, label: "Official program page" },
    ],
    title: "Program",
  },
  {
    links: [
      { label: "Contact", to: "/contact" },
      { href: FOOTER_BUG_REPORT_URL, label: "Report a bug" },
      { href: FOOTER_FEATURE_REQUEST_URL, label: "Request a feature" },
      { label: "Privacy and terms", to: "/legal" },
      { label: "Sitemap", to: "/sitemap" },
    ],
    title: "Support",
  },
];
