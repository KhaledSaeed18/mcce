/**
 * Stands in for a date on pages whose content is the Drive index itself. They
 * follow the newest indexed file instead of a date written here.
 */
export const TRACKS_INDEX = "tracks-index";

/** Same idea for the resource hub: its pages change when the catalog is rebuilt. */
export const TRACKS_RESOURCES = "tracks-resources";

// Course text and structured data can change independently of Drive files.
export const COURSE_CONTENT_LASTMOD = "2026-10-07";
const COURSE_SEO_LASTMOD = "2026-10-06";

export interface StaticPage {
  changefreq: "monthly" | "weekly";
  contentLastmod?: string;
  /**
   * The date this page's own content last changed in a way worth recrawling,
   * or TRACKS_INDEX to follow the Drive index. Bump it by hand when you change
   * what the page says. A refactor, a rename, or a formatting pass is not a
   * content change, and stamping one here only teaches crawlers to distrust
   * every date in this file.
   */
  lastmod: string | typeof TRACKS_INDEX | typeof TRACKS_RESOURCES;
  path: string;
  priority: string;
}

export const STATIC_PAGES: StaticPage[] = [
  { changefreq: "weekly", lastmod: TRACKS_INDEX, path: "/", priority: "1.0" },
  {
    changefreq: "weekly",
    lastmod: TRACKS_INDEX,
    path: "/course",
    contentLastmod: COURSE_SEO_LASTMOD,
    priority: "0.9",
  },
  {
    changefreq: "weekly",
    lastmod: TRACKS_INDEX,
    path: "/exams",
    contentLastmod: COURSE_SEO_LASTMOD,
    priority: "0.9",
  },
  {
    changefreq: "weekly",
    lastmod: TRACKS_INDEX,
    path: "/recent",
    priority: "0.7",
  },
  {
    changefreq: "monthly",
    lastmod: COURSE_SEO_LASTMOD,
    path: "/plan-of-study",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-09-21",
    path: "/cce",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-09-21",
    path: "/admissions",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-09-21",
    path: "/tuition-fees",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-09-21",
    path: "/gpa-calculator",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: TRACKS_RESOURCES,
    path: RESOURCES_PAGE_PATH,
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: TRACKS_RESOURCES,
    path: RESOURCES_THESIS_PATH,
    priority: "0.7",
  },
  {
    changefreq: "monthly",
    lastmod: TRACKS_RESOURCES,
    path: RESOURCES_OPEN_SOURCE_PATH,
    priority: "0.7",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-09-21",
    path: "/about",
    priority: "0.6",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-19",
    path: "/faq",
    priority: "0.6",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-23",
    path: "/contact",
    priority: "0.5",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-24",
    path: "/sitemap",
    priority: "0.4",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-18",
    path: "/legal",
    priority: "0.3",
  },
];

import {
  RESOURCES_OPEN_SOURCE_PATH,
  RESOURCES_PAGE_PATH,
  RESOURCES_THESIS_PATH,
} from "@/config/resources/copy";
