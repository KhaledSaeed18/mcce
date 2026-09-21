import type { ResourceCategory } from "@/config/resources/categories";
import {
  RESOURCES_OPEN_SOURCE_PATH,
  RESOURCES_PAGE_PATH,
  RESOURCES_THESIS_PATH,
} from "@/config/resources/copy";
import { SITE_URL } from "@/config/site";
import { buildPageMeta } from "@/lib/seo/meta";

export const RESOURCES_URL = `${SITE_URL}${RESOURCES_PAGE_PATH}`;
export const RESOURCES_THESIS_URL = `${SITE_URL}${RESOURCES_THESIS_PATH}`;
export const RESOURCES_OPEN_SOURCE_URL = `${SITE_URL}${RESOURCES_OPEN_SOURCE_PATH}`;

const RESOURCES_DESCRIPTION =
  "A curated directory of tools for MCCE students, with the cost of each one up front. Independent, not sponsored.";

/** Filtered states share the bare canonical, so search engines index one URL per page. */
export function buildResourcesHead() {
  return {
    links: [{ href: RESOURCES_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: RESOURCES_DESCRIPTION,
      title: "Tools · MCCE",
      url: RESOURCES_URL,
    }),
  };
}

export function categoryUrl(categoryId: string): string {
  return `${RESOURCES_URL}/${categoryId}`;
}

export function buildCategoryHead(
  category: ResourceCategory | undefined,
  categoryId: string
) {
  const url = categoryUrl(categoryId);
  return {
    links: [{ href: url, rel: "canonical" }],
    meta: category
      ? buildPageMeta({
          description: `${category.tagline} Tools for MCCE students with the cost of each one up front.`,
          title: `${category.label} · Tools · MCCE`,
          url,
        })
      : buildPageMeta({
          description:
            "This category does not exist in the MCCE tools directory.",
          robots: "noindex, follow",
          title: "Category not found · MCCE",
          url,
        }),
  };
}

export function buildThesisHead() {
  return {
    links: [{ href: RESOURCES_THESIS_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Tools for CENG695A and CENG695B in thesis order: framing, search, screening, citing, experiments, writing, and defense.",
      title: "Thesis toolkit · MCCE",
      url: RESOURCES_THESIS_URL,
    }),
  };
}

export function buildOpenSourceHead() {
  return {
    links: [{ href: RESOURCES_OPEN_SOURCE_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description:
        "Public GitHub repositories for MCCE coursework and thesis work, with the licence class and maintenance state of each one.",
      title: "Open source index · MCCE",
      url: RESOURCES_OPEN_SOURCE_URL,
    }),
  };
}
