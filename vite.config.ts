import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

import {
  ANNOTATION_FONT_DIR,
  ANNOTATION_FONT_FILE,
  PDF_STANDARD_FONTS_PATH,
} from "./src/config/pdf-editor.ts";

const ANNOTATION_FONT_SOURCE =
  "node_modules/@expo-google-fonts/cairo/400Regular/Cairo_400Regular.ttf";

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
          dest: PDF_STANDARD_FONTS_PATH.replace(/^\//, ""),
          rename: { stripBase: true },
          src: "node_modules/pdfjs-dist/standard_fonts/*",
        },
        // The annotation font is embedded into every export and measured on the
        // canvas, so it is served from our own origin rather than a font CDN.
        {
          dest: ANNOTATION_FONT_DIR,
          rename: { name: ANNOTATION_FONT_FILE, stripBase: true },
          src: ANNOTATION_FONT_SOURCE,
        },
      ],
    }),
    tailwindcss(),
    // Vitest shares this config; the workerd runtime it attaches to the
    // ssr environment breaks the Node-based test runner, so skip it under test.
    process.env.VITEST
      ? null
      : cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
});

export default config;
