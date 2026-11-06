import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import { loadSitemapPages } from "./scripts/prerender/sitemapPages.ts";
import { PDF_STANDARD_FONTS_PATH } from "./src/config/pdf-editor.ts";

const config = defineConfig({
  build: { sourcemap: true },
  /**
   * Base UI is consumed through deep subpath imports, which Vite discovers one
   * entry at a time. Without this the internals they share (CompositeList and
   * friends) can be served outside the optimized bundle, against a second copy
   * of React whose hook dispatcher is null -- the accordion on /faq then throws
   * "Cannot read properties of null (reading 'useRef')".
   */
  optimizeDeps: { include: ["@base-ui/react/*"] },
  plugins: [
    devtools(),
    // pdf.js needs the standard 14 fonts as files for PDFs that do not embed
    // them; serving them from our own origin keeps the editor self-contained.
    viteStaticCopy({
      targets: [
        {
          dest: PDF_STANDARD_FONTS_PATH.replace(/^\//u, ""),
          rename: { stripBase: true },
          src: "node_modules/pdfjs-dist/standard_fonts/*",
        },
      ],
    }),
    tailwindcss(),
    // Vitest shares this config; the workerd runtime it attaches to the
    // ssr environment breaks the Node-based test runner, so skip it under test.
    process.env.VITEST
      ? null
      : cloudflare({ viteEnvironment: { name: "ssr" } }),
    // Static files never invoke the Worker, so public pages cannot hit its CPU
    // limit. `.html` files rather than subfolders, because Workers Assets would
    // redirect a subfolder index to a trailing slash the canonical URLs lack.
    tanstackStart({
      pages: loadSitemapPages("public/sitemap.xml"),
      prerender: {
        autoStaticPathsDiscovery: false,
        autoSubfolderIndex: false,
        crawlLinks: false,
        enabled: true,
        failOnError: true,
      },
    }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
});

export default config;
