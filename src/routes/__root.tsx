import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { domAnimation, LazyMotion } from "motion/react";
import { AppErrorBoundary } from "@/components/app-error-boundary";
import { AppHeader } from "@/components/app-header";
import { DevToolsPanel } from "@/components/dev-tools-panel";
import { SiteFooter } from "@/components/footer/site-footer";
import { MarginPattern } from "@/components/margin-pattern";
import { NotFound } from "@/components/not-found";
import { PageRails } from "@/components/page-rails";
import { RecentNodesProvider } from "@/components/providers/recent-nodes-provider";
import { SavedNodesProvider } from "@/components/providers/saved-nodes-provider";
import { RouteError } from "@/components/route-error";
import { JsonLd } from "@/components/seo/json-ld";
import { GA_MEASUREMENT_ID } from "@/config/analytics";
import { GPA_SHARE_PARAM } from "@/config/gpa";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_OG_IMAGE_ALT,
  SITE_TITLE,
  SITE_URL,
} from "@/config/site";
import { useIsChromelessRoute } from "@/hooks/use-is-chromeless-route";
import { useServiceWorker } from "@/hooks/use-service-worker";
import { THEME_INIT_SCRIPT, ThemeProvider } from "@/hooks/use-theme";
import { buildWebSiteSchema } from "@/lib/seo/schema";

import appCss from "../styles.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "msvalidate.01",
        content: "D8515B3C28C31200A7D886BF913D9D7F",
      },
      {
        title: SITE_TITLE,
      },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      {
        name: "application-name",
        content: SITE_NAME,
      },
      {
        name: "apple-mobile-web-app-title",
        content: SITE_NAME,
      },
      {
        name: "theme-color",
        content: "#fff7e8",
        media: "(prefers-color-scheme: light)",
      },
      {
        name: "theme-color",
        content: "#0c0a09",
        media: "(prefers-color-scheme: dark)",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: SITE_NAME,
      },
      {
        property: "og:url",
        content: SITE_URL,
      },
      {
        property: "og:title",
        content: SITE_TITLE,
      },
      {
        property: "og:description",
        content: SITE_DESCRIPTION,
      },
      {
        property: "og:image",
        content: SITE_OG_IMAGE,
      },
      {
        property: "og:image:width",
        content: "1200",
      },
      {
        property: "og:image:height",
        content: "630",
      },
      {
        property: "og:image:alt",
        content: SITE_OG_IMAGE_ALT,
      },
      {
        property: "og:locale",
        content: "en_US",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: SITE_TITLE,
      },
      {
        name: "twitter:description",
        content: SITE_DESCRIPTION,
      },
      {
        name: "twitter:image",
        content: SITE_OG_IMAGE,
      },
      {
        name: "twitter:image:alt",
        content: SITE_OG_IMAGE_ALT,
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Warms up the connection ahead of the deferred GA script fetch,
      // without competing for bandwidth itself.
      ...(import.meta.env.PROD && GA_MEASUREMENT_ID
        ? [
            { rel: "preconnect", href: "https://www.googletagmanager.com" },
            {
              rel: "preconnect",
              href: "https://www.google-analytics.com",
              crossOrigin: "anonymous" as const,
            },
          ]
        : []),
      {
        rel: "icon",
        href: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        href: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        rel: "icon",
        href: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        rel: "icon",
        href: "/favicon.ico",
        sizes: "48x48",
      },
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "mask-icon",
        href: "/mask-icon.svg",
        color: "#ff9f1c",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "MCCE: recently added",
        href: "/feed.xml",
      },
    ],
    // The GA library itself is fetched after window load, so it never
    // competes with critical assets for bandwidth on a slow connection.
    // gtag() calls made before then just queue into dataLayer.
    // The first page view is sent by hand because a GPA share link carries
    // the student's averages in the query string, and the default page view
    // would report the full URL.
    scripts:
      import.meta.env.PROD && GA_MEASUREMENT_ID
        ? [
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}function stripShare(h){if(!h)return h;var u=new URL(h);u.searchParams.delete(${JSON.stringify(GPA_SHARE_PARAM)});return u.href;}gtag("js",new Date());gtag("config","${GA_MEASUREMENT_ID}",{send_page_view:false});gtag("event","page_view",{page_location:stripShare(location.href),page_referrer:stripShare(document.referrer)});window.addEventListener("load",function(){var s=document.createElement("script");s.src="https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}";s.async=true;document.head.appendChild(s);});`,
            },
          ]
        : [],
  }),
  errorComponent: RouteError,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

function AppShell({ children }: { children: React.ReactNode }) {
  const isChromeless = useIsChromelessRoute();

  if (isChromeless) {
    return <div className="relative flex h-dvh flex-col">{children}</div>;
  }

  return (
    <div className="relative flex min-h-dvh flex-col">
      <AppHeader />
      <div className="flex-1">{children}</div>
      <SiteFooter />
      <MarginPattern />
      <PageRails />
    </div>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  useServiceWorker();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, build-time-authored script that sets the theme class before first paint to avoid a flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
        <JsonLd data={buildWebSiteSchema()} />
      </head>
      <body>
        {/* Every `m.*` component in the tree reads its animation and gesture
            support from here, instead of each bundling its own copy. */}
        <LazyMotion features={domAnimation} strict>
          <ThemeProvider>
            <SavedNodesProvider>
              <RecentNodesProvider>
                <AppErrorBoundary>
                  <AppShell>{children}</AppShell>
                </AppErrorBoundary>
              </RecentNodesProvider>
            </SavedNodesProvider>
          </ThemeProvider>
        </LazyMotion>
        <DevToolsPanel />
        <Scripts />
      </body>
    </html>
  );
}
