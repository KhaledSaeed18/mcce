import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
