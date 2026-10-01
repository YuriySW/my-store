import {createClient} from '@sanity/client'
import {LexoRank} from 'lexorank'
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

/** Проставить orderRank всем category (корни по имени, подкатегории внутри родителя) */
async function assignRanks(docs) {
  if (docs.length === 0) return 0
  let rank = LexoRank.min()
  const tx = client.transaction()
  for (const doc of docs) {
    rank = rank.genNext().genNext()
    tx.patch(doc._id, {set: {orderRank: rank.toString()}})
  }
  await tx.commit({visibility: 'async'})
  return docs.length
}

const roots = await client.fetch(
  `*[_type=="category" && !defined(parent)] | order(name asc) {_id, name}`,
)
const nRoots = await assignRanks(roots)
console.log(`Root categories ranked: ${nRoots}`)

const parents = await client.fetch(
  `*[_type=="category" && defined(parent)] | order(parent._ref asc, name asc) {_id, "parentId": parent._ref}`,
)

const byParent = new Map()
for (const doc of parents) {
  const list = byParent.get(doc.parentId) || []
  list.push(doc)
  byParent.set(doc.parentId, list)
}

let nSubs = 0
for (const [, list] of byParent) {
  nSubs += await assignRanks(list)
}
console.log(`Subcategories ranked: ${nSubs}`)
console.log('Done. Refresh /admin → Категории')
