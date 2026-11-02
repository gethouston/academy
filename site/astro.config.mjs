// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
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
  // React only renders the Apps SDK buttons to HTML at build time; none of it ships to the browser.
  integrations: [mdx(), react()],
  vite: {
    plugins: [tailwindcss()],
    // The package ships extensionless imports and CSS modules, so Vite has to bundle it.
    ssr: { noExternal: ["@openai/apps-sdk-ui"] },
    environments: {
      prerender: { resolve: { noExternal: ["@openai/apps-sdk-ui"] } },
    },
  },
});
