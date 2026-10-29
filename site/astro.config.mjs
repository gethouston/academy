// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// English lives at the root (/), Spanish under /es/. Every page exists in both.
export default defineConfig({
  site: "https://academy.gethouston.ai",
  integrations: [
    starlight({
      title: { en: "Houston Academy", es: "Houston Academy" },
      description:
        "From zero to hero: build real software with AI agents, without writing code.",
      defaultLocale: "root",
      locales: {
        root: { label: "English", lang: "en" },
        es: { label: "Español", lang: "es" },
      },
      logo: { src: "./src/assets/houston-icon.png", alt: "Houston" },
      favicon: "/favicon.png",
      customCss: ["./src/styles/houston.css", "./src/styles/navigation.css"],
      head: [
        {
          tag: "link",
          attrs: { rel: "preconnect", href: "https://api.fontshare.com" },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap",
          },
        },
      ],
      social: [
        { icon: "x.com", label: "X: @ja818_", href: "https://x.com/ja818_" },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/gethouston/academy",
        },
      ],
      // The sidebar, breadcrumbs and lesson navigation are drawn from src/data/program.ts.
      components: {
        Sidebar: "./src/components/overrides/Sidebar.astro",
        PageTitle: "./src/components/overrides/PageTitle.astro",
        Pagination: "./src/components/overrides/Pagination.astro",
        Footer: "./src/components/overrides/Footer.astro",
      },
      sidebar: [
        { slug: "how-it-works" },
        { slug: "program" },
        { slug: "glossary" },
      ],
    }),
  ],
});
