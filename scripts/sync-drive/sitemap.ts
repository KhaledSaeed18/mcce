import { CURRICULUM } from "../../src/config/curriculum";
import { SITE_URL } from "../../src/config/site";
import { flattenCourses } from "../../src/lib/curriculum/lookup";
import type { DriveIndex } from "../../src/lib/drive/types";
import { buildCourseDateMap, getIndexDate } from "./sitemap-dates";

/**
 * Stands in for a date on pages whose content is the Drive index itself. They
 * follow the newest indexed file instead of a date written here.
 */
const TRACKS_INDEX = "tracks-index";

/**
 * What a course page says when the course has no indexed material yet: its
 * description, credits, and prerequisites, all of which come from CURRICULUM.
 */
const CURRICULUM_LASTMOD = "2026-08-21";

interface StaticPage {
  changefreq: "monthly" | "weekly";
  /**
   * The date this page's own content last changed in a way worth recrawling,
   * or TRACKS_INDEX to follow the Drive index. Bump it by hand when you change
   * what the page says. A refactor, a rename, or a formatting pass is not a
   * content change, and stamping one here only teaches crawlers to distrust
   * every date in this file.
   */
  lastmod: string | typeof TRACKS_INDEX;
  path: string;
  priority: string;
}

const STATIC_PAGES: StaticPage[] = [
  { changefreq: "weekly", lastmod: TRACKS_INDEX, path: "/", priority: "1.0" },
  {
    changefreq: "weekly",
    lastmod: TRACKS_INDEX,
    path: "/course",
    priority: "0.9",
  },
  {
    changefreq: "weekly",
    lastmod: TRACKS_INDEX,
    path: "/exams",
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
    lastmod: "2026-08-19",
    path: "/search",
    priority: "0.7",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-23",
    path: "/plan-of-study",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-24",
    path: "/cce",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-24",
    path: "/admissions",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-23",
    path: "/tuition-fees",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-18",
    path: "/gpa-calculator",
    priority: "0.8",
  },
  {
    changefreq: "monthly",
    lastmod: "2026-08-21",
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

function buildUrlEntry(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string
): string {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

/**
 * One sitemap entry per static page plus every indexed Drive folder, so course
 * folders are discoverable directly.
 *
 * Every lastmod here has to describe the URL it sits on. Stamping the run's own
 * timestamp across the file would move every date every week whether or not
 * anything changed, which is the pattern search engines read as noise and stop
 * trusting.
 */
export function buildSitemapXml(index: DriveIndex): string {
  const indexDate = getIndexDate(index);
  const courseDates = buildCourseDateMap(index.nodes);

  const staticEntries = STATIC_PAGES.map((page) =>
    buildUrlEntry(
      `${SITE_URL}${page.path}`,
      page.lastmod === TRACKS_INDEX ? indexDate : page.lastmod,
      page.changefreq,
      page.priority
    )
  );

  // Every curriculum course, not only the ones with material: the page carries
  // the description, credits, and prerequisites either way.
  const courseEntries = flattenCourses(CURRICULUM).map((course) =>
    buildUrlEntry(
      `${SITE_URL}/course/${course.code}`,
      courseDates.get(course.code) ?? CURRICULUM_LASTMOD,
      "weekly",
      "0.8"
    )
  );

  // Only course-level folders (depth 1, one per course) get a sitemap entry.
  // Deeper folders (lectures, exams, labs, ...) are thin, near-duplicate
  // listings that would dilute crawl budget away from the pages worth ranking.
  const folderEntries = index.nodes
    .filter((node) => node.kind === "folder" && node.depth === 1)
    .map((node) =>
      buildUrlEntry(
        `${SITE_URL}/browse/${node.id}`,
        node.modifiedTime.slice(0, 10),
        "weekly",
        "0.7"
      )
    );

  return `${[
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...courseEntries,
    ...folderEntries,
    "</urlset>",
  ].join("\n")}\n`;
}
