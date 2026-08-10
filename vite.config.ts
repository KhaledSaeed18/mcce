import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      router: {
        routeTreeFileHeader: [],
      },
    }),
    viteReact(),
  ],
  resolve: { tsconfigPaths: true },
});

export default config;
