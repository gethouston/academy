import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

// Course overviews and lessons: src/content/courses/<en|es>/<course>/<lesson>.mdx
// (index.mdx is the course overview). Ids look like "en/hello-internet/check-it".
const courses = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/courses" }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

// Standalone pages: src/content/pages/<en|es>/<page>.mdx
const pages = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/pages" }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { courses, pages };
