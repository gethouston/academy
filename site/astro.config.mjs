// @ts-check

import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// English lives at the root (/), Spanish under /es/. Every page exists in both.
export default defineConfig({
  site: "https://academy.gethouston.ai",
  trailingSlash: "always",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
});
