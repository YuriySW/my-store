import {createClient} from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({path: '.env.local'})

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
})

/** Переносит старое поле image → images[] для portfolioItem */
const docs = await client.fetch(
  `*[_type=="portfolioItem" && defined(image) && (!defined(images) || count(images)==0)]{_id, image}`,
)

if (docs.length === 0) {
  console.log('Nothing to migrate.')
  process.exit(0)
}

const tx = client.transaction()
for (const doc of docs) {
  tx.patch(doc._id, {
    set: {
      images: [
        {
          _type: 'image',
          _key: `img-${doc._id.slice(-6)}`,
          asset: doc.image.asset,
          ...(doc.image.hotspot ? {hotspot: doc.image.hotspot} : {}),
          ...(doc.image.crop ? {crop: doc.image.crop} : {}),
        },
      ],
    },
    unset: ['image'],
  })
}

await tx.commit({visibility: 'async'})
console.log(`Migrated ${docs.length} portfolio items: image → images`)
