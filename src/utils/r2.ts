/**
 * Cloudflare R2 Utilities
 * Handles fetching images and assets from R2 bucket
 */
import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

export interface R2Image {
  key: string;
  url: string;
  size: number;
  lastModified: Date;
}

/**
 * Create R2 client instance
 */
function createR2Client() {
  if (
    !import.meta.env.CLOUDFLARE_ACCOUNT_ID ||
    !import.meta.env.R2_ACCESS_KEY_ID ||
    !import.meta.env.R2_SECRET_ACCESS_KEY
  ) {
    console.warn('R2 credentials not configured. Using fallback.');
    return null;
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${import.meta.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: import.meta.env.R2_ACCESS_KEY_ID,
      secretAccessKey: import.meta.env.R2_SECRET_ACCESS_KEY,
    },
  });
}

/**
 * Fetch all images from a specific R2 directory
 * @param prefix - Directory path in R2 (e.g., 'tutti/')
 * @returns Array of image objects with public URLs
 */
export async function fetchR2Images(prefix: string): Promise<R2Image[]> {
  const client = createR2Client();

  if (!client) {
    console.warn(`R2 client not available. Returning empty array.`);
    return [];
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: import.meta.env.R2_BUCKET_NAME || 'cuarteto-metanoia',
      Prefix: prefix,
    });

    const response = await client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
      console.warn(`No images found in R2 bucket at prefix: ${prefix}`);
      return [];
    }

    const publicUrl = import.meta.env.R2_PUBLIC_URL || `https://pub-${import.meta.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev`;

    // Filter only image files and map to R2Image objects
    const images = response.Contents
      .filter((item) => {
        if (!item.Key) return false;
        const ext = item.Key.toLowerCase();
        return ext.endsWith('.jpg') ||
               ext.endsWith('.jpeg') ||
               ext.endsWith('.png') ||
               ext.endsWith('.webp');
      })
      .map((item) => ({
        key: item.Key!,
        url: `${publicUrl}/${item.Key}`,
        size: item.Size || 0,
        lastModified: item.LastModified || new Date(),
      }));

    return images;
  } catch (error) {
    console.error(`Error fetching images from R2 (prefix: ${prefix}):`, error);
    return [];
  }
}

/**
 * Get a random image from R2 directory
 * @param prefix - Directory path in R2
 * @returns Single random image or null
 */
export async function getRandomR2Image(prefix: string): Promise<R2Image | null> {
  const images = await fetchR2Images(prefix);

  if (images.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

/**
 * Get image by specific key
 * @param key - Full key path of image
 * @returns Image object or null
 */
export async function getR2ImageByKey(key: string): Promise<R2Image | null> {
  const publicUrl = import.meta.env.R2_PUBLIC_URL || `https://pub-${import.meta.env.CLOUDFLARE_ACCOUNT_ID}.r2.dev`;

  try {
    return {
      key,
      url: `${publicUrl}/${key}`,
      size: 0,
      lastModified: new Date(),
    };
  } catch (error) {
    console.error(`Error getting R2 image by key: ${key}`, error);
    return null;
  }
}

/**
 * Fallback image URLs for development
 */
export const FALLBACK_HERO_IMAGES = [
  '/images/fallback-hero-1.jpg',
  '/images/fallback-hero-2.jpg',
  '/images/fallback-hero-3.jpg',
];

/**
 * Get random fallback image
 */
export function getRandomFallbackImage(): string {
  const randomIndex = Math.floor(Math.random() * FALLBACK_HERO_IMAGES.length);
  return FALLBACK_HERO_IMAGES[randomIndex];
}
