import { describe, expect, it } from "vitest";
import { SITE_URL } from "@/config/site";
import { buildPageGraph, buildWebApplicationGraph } from "./page-schema";

const OPTIONS = {
  description: "Past papers",
  name: "Exams",
  url: `${SITE_URL}/exams`,
};

describe("buildPageGraph", () => {
  it("types the page and places it under the home page", () => {
    const [page, breadcrumb] = buildPageGraph({
      ...OPTIONS,
      pageType: "CollectionPage",
    })["@graph"];

    expect(page).toMatchObject({
      "@type": "CollectionPage",
      url: OPTIONS.url,
    });
    expect(breadcrumb).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { item: SITE_URL, position: 1 },
        { item: OPTIONS.url, position: 2 },
      ],
    });
  });

  it("keeps the schema context only at the top of the graph", () => {
    const graph = buildPageGraph({ ...OPTIONS, pageType: "WebPage" });

    expect(graph["@context"]).toBe("https://schema.org");
    expect(graph["@graph"][1]).not.toHaveProperty("@context");
  });
});

describe("buildWebApplicationGraph", () => {
  it("marks the tool as free", () => {
    const [app] = buildWebApplicationGraph(OPTIONS)["@graph"];

    expect(app).toMatchObject({
      "@type": "WebApplication",
      isAccessibleForFree: true,
      offers: { price: 0 },
    });
  });
});
