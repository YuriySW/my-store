/**
 * Сравнивает размер оригиналов Sanity vs оптимизированных URL (@sanity/image-url).
 * Запуск: node scripts/measure-image-sizes.mjs [category-slug]
 */
import {createClient} from '@sanity/client';
import {createImageUrlBuilder} from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const categorySlug = process.argv[2];

const client = createClient({projectId, dataset, useCdn: true, apiVersion: '2023-05-03'});
const builder = createImageUrlBuilder(client);

async function fetchBytes(url) {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const format = res.headers.get('content-type')?.split('/')[1] ?? '?';
  return {bytes: buf.byteLength, format};
}

async function measureSet(label, sources, size = 400) {
  let rawTotal = 0;
  let optTotal = 0;
  const rows = [];

  for (const src of sources) {
    if (!src?.url) continue;
    const raw = await fetchBytes(src.url);
    const optUrl = builder.image(src).width(size).auto('format').quality(80).url();
    const opt = await fetchBytes(optUrl);
    rawTotal += raw.bytes;
    optTotal += opt.bytes;
    rows.push({
      rawKb: Math.round(raw.bytes / 1024),
      optKb: Math.round(opt.bytes / 1024),
      format: opt.format,
      saved: Math.round((1 - opt.bytes / raw.bytes) * 100),
    });
  }

  console.log(`\n=== ${label} (${rows.length} images, w=${size}) ===`);
  console.log(
    `RAW:  ${Math.round(rawTotal / 1024)} KB total, ~${Math.round(rawTotal / rows.length / 1024)} KB avg`,
  );
  console.log(
    `OPT:  ${Math.round(optTotal / 1024)} KB total, ~${Math.round(optTotal / rows.length / 1024)} KB avg`,
  );
  console.log(`Saved: ${Math.round((1 - optTotal / rawTotal) * 100)}%`);

  if (rows.length <= 8) {
    rows.forEach((r, i) =>
      console.log(`  #${i + 1}: ${r.rawKb}KB → ${r.optKb}KB (${r.format}, -${r.saved}%)`),
    );
  }

  return {rawTotal, optTotal, count: rows.length};
}

const allProducts = await client.fetch(
  `*[_type == "product"]{ "src": images[0].asset->{_id, url} }`,
);
const allSources = allProducts.map((p) => p.src).filter(Boolean);
await measureSet('All products (first image)', allSources, 400);

if (categorySlug) {
  const catProducts = await client.fetch(
    `*[_type == "product" && category->slug.current == $slug]{
      name,
      "src": images[0].asset->{_id, url}
    }`,
    {slug: categorySlug},
  );
  const catSources = catProducts.map((p) => p.src).filter(Boolean);
  await measureSet(`Category /${categorySlug}`, catSources, 400);
}
