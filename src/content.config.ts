import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recipes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    language: z.array(z.enum(['en', 'es'])).min(1),
    translationGroup: z.string().optional(),
    heroImage: z.string().optional(),
    imageAlt: z.string().optional(),
    imageCredit: z.string().optional(),
    imageCreditUrl: z.url().optional(),
    imageLicense: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    published: z.boolean().default(true),
  }),
});

export const collections = { recipes };
