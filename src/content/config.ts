/**
 * Content Collections Configuration
 * Define schemas for content validation
 */
import { z, defineCollection } from 'astro:content';

// i18n content collection (JSON files)
const i18nCollection = defineCollection({
  type: 'data',
  schema: z.any(), // Flexible schema for different content structures
});

export const collections = {
  i18n: i18nCollection,
};
