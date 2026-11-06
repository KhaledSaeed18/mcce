import { createFileRoute } from "@tanstack/react-router";
import { LinksCourses } from "@/components/links/links-courses";
import { LinksFolderList } from "@/components/links/links-folder-list";
import { LinksFooter } from "@/components/links/links-footer";
import { LinksIntro } from "@/components/links/links-intro";
import { LinksSiteNav } from "@/components/links/links-site-nav";
import { JsonLd } from "@/components/seo/json-ld";
import {
  LINKS_META_DESCRIPTION,
  LINKS_META_TITLE,
  LINKS_URL,
} from "@/config/links";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import { SITE_BRAND } from "@/config/site";
import { linksSummaryQueryOptions } from "@/lib/drive/queries";
import {
  buildLinksBreadcrumbSchema,
  buildLinksPageSchema,
} from "@/lib/seo/links-schema";
import { buildPageMeta } from "@/lib/seo/meta";
import { formatPageTitle } from "@/lib/seo/page-title";

export const Route = createFileRoute("/links")({
  component: LinksPage,
  head: () => ({
    links: [{ href: LINKS_URL, rel: "canonical" }],
    meta: buildPageMeta({
      description: LINKS_META_DESCRIPTION,
      title: formatPageTitle(LINKS_META_TITLE, SITE_BRAND),
      url: LINKS_URL,
    }),
  }),
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(linksSummaryQueryOptions),
});

function LinksPage() {
  const { semesterFolders, syncedAt } = Route.useLoaderData();

  return (
    <div className="relative isolate min-h-dvh shrink-0">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={DOT_GRID_BACKGROUND}
      />

      <main className="mx-auto max-w-lg p-4 pb-8 sm:p-6 lg:flex lg:min-h-dvh lg:max-w-6xl lg:items-center lg:py-10">
        {/* One column in reading order until there is room for two. The second
            row is 1fr so the taller right column stretches only that row, and
            the left column's heading stays next to what follows it. */}
        <div className="grid w-full gap-5 sm:gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
          <LinksIntro />
          <div className="flex flex-col gap-5 sm:gap-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:gap-8">
            <LinksFolderList folders={semesterFolders} />
            <LinksCourses folders={semesterFolders} />
          </div>
          <div className="flex flex-col gap-6 lg:col-start-1 lg:row-start-2">
            <LinksSiteNav />
            <LinksFooter syncedAt={syncedAt} />
          </div>
        </div>
      </main>

      <JsonLd data={buildLinksPageSchema(semesterFolders, syncedAt)} />
      <JsonLd data={buildLinksBreadcrumbSchema()} />
    </div>
  );
}
