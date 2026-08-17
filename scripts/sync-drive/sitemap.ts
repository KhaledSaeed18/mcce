import { CURRICULUM } from "../../src/config/curriculum";
import { SITE_URL } from "../../src/config/site";
import { flattenCourses } from "../../src/lib/curriculum/lookup";
import type { DriveIndex } from "../../src/lib/drive/types";

interface StaticPage {
  changefreq: "monthly" | "weekly";
  path: string;
  priority: string;
}

const STATIC_PAGES: StaticPage[] = [
  { changefreq: "weekly", path: "/", priority: "1.0" },
  { changefreq: "weekly", path: "/exams", priority: "0.9" },
  { changefreq: "weekly", path: "/recent", priority: "0.7" },
  { changefreq: "weekly", path: "/plan-of-study", priority: "0.8" },
  { changefreq: "monthly", path: "/gpa-calculator", priority: "0.8" },
  { changefreq: "monthly", path: "/about", priority: "0.6" },
  { changefreq: "monthly", path: "/faq", priority: "0.6" },
  { changefreq: "monthly", path: "/contact", priority: "0.5" },
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

/** One sitemap entry per static page plus every indexed Drive folder, so course folders are discoverable directly. */
export function buildSitemapXml(index: DriveIndex): string {
  const generatedDate = index.meta.generatedAt.slice(0, 10);

  const staticEntries = STATIC_PAGES.map((page) =>
    buildUrlEntry(
      `${SITE_URL}${page.path}`,
      generatedDate,
      page.changefreq,
      page.priority
    )
  );

  // Every curriculum course, not only the ones with material: the page carries
  // the description, credits, and prerequisites either way.
  const courseEntries = flattenCourses(CURRICULUM).map((course) =>
    buildUrlEntry(
      `${SITE_URL}/course/${course.code}`,
      generatedDate,
      "weekly",
      "0.8"
    )
  );

  const folderEntries = index.nodes
    .filter((node) => node.kind === "folder")
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
