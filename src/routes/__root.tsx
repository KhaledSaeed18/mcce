import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/footer/site-footer";
import { MarginPattern } from "@/components/margin-pattern";
import { NotFound } from "@/components/not-found";
import { PageRails } from "@/components/page-rails";
import { RecentNodesProvider } from "@/components/providers/recent-nodes-provider";
import { SavedNodesProvider } from "@/components/providers/saved-nodes-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { GA_MEASUREMENT_ID } from "@/config/analytics";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "@/config/site";
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
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
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
    scripts:
      import.meta.env.PROD && GA_MEASUREMENT_ID
        ? [
            {
              src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`,
              async: true,
            },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${GA_MEASUREMENT_ID}");`,
            },
          ]
        : [],
  }),
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
});

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
        <ThemeProvider>
          <SavedNodesProvider>
            <RecentNodesProvider>
              <div className="relative flex min-h-dvh flex-col">
                <AppHeader />
                <div className="flex-1">{children}</div>
                <SiteFooter />
                <MarginPattern />
                <PageRails />
              </div>
            </RecentNodesProvider>
          </SavedNodesProvider>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
