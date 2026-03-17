import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6jto0ep'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_TOKEN

if (!token) {
  console.error(
    'Missing SANITY_API_TOKEN. Create a token with write access in Sanity and run again.',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
})

const categories = await client.fetch(
  `*[_type=="category"]{_id, name, parent, "subs": subcategories[]._ref}`,
)

const byId = new Map(categories.map((c) => [c._id, c]))
const planned = []

for (const parent of categories) {
  const subs = Array.isArray(parent.subs) ? parent.subs.filter(Boolean) : []
  for (const subId of subs) {
    if (subId === parent._id) continue
    const sub = byId.get(subId)
    if (!sub) continue

    const currentParentRef = sub?.parent?._ref
    if (currentParentRef === parent._id) continue

    planned.push({ subId, parentId: parent._id, parentName: parent.name, subName: sub.name })
  }
}

if (planned.length === 0) {
  console.log('Nothing to migrate. No subcategories without parent found.')
  process.exit(0)
}

console.log(`Planned updates: ${planned.length}`)
for (const item of planned.slice(0, 20)) {
  console.log(`- ${item.subName || item.subId} -> parent: ${item.parentName || item.parentId}`)
}
if (planned.length > 20) console.log(`... and ${planned.length - 20} more`)

const tx = client.transaction()
for (const { subId, parentId } of planned) {
  tx.patch(subId, { set: { parent: { _type: 'reference', _ref: parentId } } })
}

const res = await tx.commit({ visibility: 'async' })
console.log('Migration committed.')
console.log(`Transaction id: ${res.transactionId}`)

