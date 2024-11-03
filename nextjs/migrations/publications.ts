import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/publication.json'
import { convertCategories } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding publication')
    const payload = await getPayload({ config })

    try {
        for (const publication of data) {
            await payload.create({
                collection: 'publications',
                data: {
                    title: publication.title.rendered,
                    slug: publication.slug,
                    publication_file: "6710052a95e3cff04007c104",
                    categories: convertCategories(publication.categories),
                },
            })
        }
    } catch (error) {
        console.error(error)
    }
}

seed()
    .then(() => console.log('🚀 Publications seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))