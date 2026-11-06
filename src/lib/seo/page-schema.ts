import { SITE_NAME, SITE_URL } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

interface PageGraphOptions {
  description: string;
  name: string;
  /** Crawlers read these as the page's purpose, so pick the closest schema.org type. */
  pageType: "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage";
  url: string;
}

function buildPageNode({ description, name, pageType, url }: PageGraphOptions) {
  return {
    "@type": pageType,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/#website`, "@type": "WebSite" },
    name,
    url,
  };
}

function buildBreadcrumbNode(name: string, url: string) {
  const { "@context": _context, ...breadcrumb } = buildBreadcrumbSchema([
    { name: SITE_NAME, url: SITE_URL },
    { name, url },
  ]);
  return breadcrumb;
}

/** A page's type and its place in the site, as one block. */
export function buildPageGraph(options: PageGraphOptions) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPageNode(options),
      buildBreadcrumbNode(options.name, options.url),
    ],
  };
}

interface WebApplicationOptions {
  description: string;
  name: string;
  url: string;
}

/** A free in-browser tool, with the same breadcrumb as any other page. */
export function buildWebApplicationGraph({
  description,
  name,
  url,
}: WebApplicationOptions) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        applicationCategory: "EducationalApplication",
        description,
        isAccessibleForFree: true,
        name,
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        operatingSystem: "Any",
        url,
      },
      buildBreadcrumbNode(name, url),
    ],
  };
}
