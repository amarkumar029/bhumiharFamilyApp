import ImageResizer from 'react-native-image-resizer';
import { Platform } from 'react-native';
import { toast } from './hooks/toast';

const MAX_SIZE_MB = 3;
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
const QUALITY_STEP = 10; // Quality step in percentage
const MIN_QUALITY = 30; // Minimum quality percentage

/**
 * Compress an image file in React Native
 * @param uri The local file URI of the image
 * @param maxSizeMB Maximum file size in MB
 * @returns Compressed image URI
 */
export async function compressImageRN(uri: string, maxSizeMB = MAX_SIZE_MB): Promise<string | null> {
  try {
    let quality = 100; // Start with full quality
    let compressedUri = uri;

    while (quality >= MIN_QUALITY) {
      const response = await ImageResizer.createResizedImage(
        compressedUri,
        MAX_WIDTH,
        MAX_HEIGHT,
        'JPEG',
        quality,
        0, // rotation
        undefined, // output path
        false,
        { mode: 'contain', onlyScaleDown: true }
      );

      // Check file size
      const fileSizeMB = (response.size ?? 0) / (1024 * 1024);
      if (fileSizeMB <= maxSizeMB) {
        return response.uri;
      }

      // Reduce quality and try again
      quality -= QUALITY_STEP;
      compressedUri = response.uri;
    }

    toast({
      title: 'Image too large',
      description: `Unable to compress image below ${maxSizeMB} MB.`,
      variant: 'destructive',
    });

    return null;
  } catch (error) {
    console.error('Image compression failed:', error);
    toast({
      title: 'Image compression failed',
      description: 'Unable to process image. Please try a different image.',
      variant: 'destructive',
    });
    return null;
  }
}