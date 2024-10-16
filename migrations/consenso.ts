import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/consenso.json'
import { convertCategories } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding consensos')
    const payload = await getPayload({ config })

    for (const item of data) {
        try {
            await payload.create({
                collection: 'consensos',
                data: {
                    slug: item.slug,
                    title: item.title.rendered,
                    categories: convertCategories(item.categories),
                    consenso_type: "file",
                },
            })
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Consensos seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))