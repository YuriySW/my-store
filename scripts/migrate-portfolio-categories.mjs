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

/** Только основные категории — как в меню каталога. ID без точек. */
const CATEGORIES = [
  {id: 'pc-kaminy', name: 'Камины', slug: 'kaminy', rank: '0|100000:'},
  {
    id: 'pc-barbekyu',
    name: 'Барбекю комплексы',
    slug: 'barbekyu-kompleksy',
    rank: '0|10000G:',
  },
  {
    id: 'pc-parovye',
    name: 'Паровые электрокамины',
    slug: 'parovye-kaminy',
    rank: '0|10000W:',
  },
  {
    id: 'pc-avto-bio',
    name: 'Автоматические биокамины',
    slug: 'avtomaticheskie-biokaminy',
    rank: '0|10000g:',
  },
  {id: 'pc-biokaminy', name: 'Биокамины', slug: 'biokaminy', rank: '0|10000w:'},
  {
    id: 'pc-ulichnye-kaminy',
    name: 'Уличные камины',
    slug: 'ulichnye-kaminy',
    rank: '0|100010:',
  },
]

const KEEP = new Set(CATEGORIES.map((c) => c.id))

const ASSIGNMENTS = [
  {match: /барбекю|бабекю/i, categoryId: 'pc-barbekyu'},
  {match: /уличн/i, categoryId: 'pc-ulichnye-kaminy'},
  {match: /био/i, categoryId: 'pc-biokaminy'},
  {match: /паров|электро/i, categoryId: 'pc-parovye'},
  // Fireline модели → Камины
  {match: /эрго|элипс|эклипс|куб|либерти|фаерлайн|fireline/i, categoryId: 'pc-kaminy'},
]

function pickCategory(modelName) {
  for (const rule of ASSIGNMENTS) {
    if (rule.match.test(modelName)) return rule.categoryId
  }
  return 'pc-kaminy'
}

const existing = await client.fetch(`*[_type=="portfolioCategory"]._id`)
const tx = client.transaction()

for (const id of existing) {
  if (!KEEP.has(id)) tx.delete(id)
}

for (const cat of CATEGORIES) {
  tx.createOrReplace({
    _id: cat.id,
    _type: 'portfolioCategory',
    name: cat.name,
    slug: {_type: 'slug', current: cat.slug},
    orderRank: cat.rank,
  })
}

const items = await client.fetch(`*[_type=="portfolioItem"]{_id, modelName}`)

for (const item of items) {
  const categoryId = pickCategory(item.modelName || '')
  tx.patch(item._id, {
    set: {
      category: {_type: 'reference', _ref: categoryId},
    },
  })
  console.log(`${item.modelName} → ${categoryId}`)
}

await tx.commit({visibility: 'async'})
console.log(`Set ${CATEGORIES.length} categories, patched ${items.length} items, deleted extras`)
