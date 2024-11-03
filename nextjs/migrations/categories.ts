import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/categories.json'

const seed = async () => {
    console.log('🌱 Seeding categories')
    const payload = await getPayload({ config })

    for (const category of data) {
        await payload.create({
            collection: 'categories',
            data: {
                name: category.name,
                slug: category.slug,
            },
        })
    }
}

seed()
    .then(() => console.log('🚀 Categories seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))