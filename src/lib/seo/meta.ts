interface PageMetaInput {
  description: string;
  robots?: string;
  title: string;
  url: string;
}

/** Full head meta array for a route: title, description, and matching Open Graph / Twitter tags. */
export function buildPageMeta({
  description,
  robots,
  title,
  url,
}: PageMetaInput) {
  const meta = [
    { title },
    { content: description, name: "description" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
    { content: url, property: "og:url" },
    { content: title, name: "twitter:title" },
    { content: description, name: "twitter:description" },
  ];

  if (robots) {
    meta.push({ content: robots, name: "robots" });
  }

  return meta;
}
