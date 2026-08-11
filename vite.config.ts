import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
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
