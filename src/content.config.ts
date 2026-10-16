import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const duration = z.string().regex(/^PT(?=\d)(?:[1-9]\d*H)?(?:[1-9]\d*M)?$/);

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
    recipeYield: z.string().trim().min(1).optional(),
    prepTime: duration.optional(),
    cookTime: duration.optional(),
    totalTime: duration.optional(),
    draft: z.boolean().default(false),
    published: z.boolean().default(true),
  }).refine(data => Boolean(data.prepTime) === Boolean(data.cookTime), {
    message: 'Provide both prepTime and cookTime, or omit both. Use totalTime when only the total is known.',
  }),
});

export const collections = { recipes };
