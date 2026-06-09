import {createImageUrlBuilder} from '@sanity/image-url';
import {sanityClient} from './sanity';

const builder = createImageUrlBuilder(sanityClient);

/** Asset ref/object accepted by @sanity/image-url */
export type SanityImageSource = {_id?: string; url?: string};

export type ImageSize = 'card' | 'thumb' | 'gallery' | 'category' | 'drawing';

const SIZE_PRESETS: Record<ImageSize, number> = {
  thumb: 120,
  card: 400,
  category: 600,
  gallery: 900,
  drawing: 1200,
};

export function productImageUrl(
  source: SanityImageSource | undefined | null,
  size: ImageSize = 'card',
): string {
  if (!source) return '/images/placeholder.png';

  return builder
    .image(source)
    .width(SIZE_PRESETS[size])
    .auto('format')
    .quality(80)
    .url();
}
