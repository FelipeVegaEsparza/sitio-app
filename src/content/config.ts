import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.object({
      name: z.string(),
      title: z.string().optional()
    }).optional(),
    image: z.string().optional()
  })
});

export const collections = {
  'blog': blogCollection
};
