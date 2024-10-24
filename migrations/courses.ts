import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/courses.json'
import { convertCategories, convertStringToLexical, LexicalNode } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding courses')
    const payload = await getPayload({ config })

    for (const item of data) {
        try {
            await payload.create({
                collection: 'courses',
                data: {
                    title: item.title.rendered,
                    categories: convertCategories(item.categories),
                    description: await convertStringToLexical(item.content.rendered ?? "ADD ME") as LexicalNode,
                    createdAt: item.date_gmt,
                },
            })
        } catch (error) {
            console.log(item.title.rendered)
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Courses seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))