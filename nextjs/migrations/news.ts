import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/news.json'
import { convertCategories, convertStringToLexical, LexicalNode } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding News Articles')
    const payload = await getPayload({ config })

    try {
        for (const publication of data) {
            await payload.create({
                collection: 'noticias',
                data: {
                    title: publication.title.rendered,
                    slug: publication.slug,
                    is_featured: publication.acf.noticia_featured,
                    categories: convertCategories(publication.categories),
                    content: await convertStringToLexical(publication.acf.noticia_content) as LexicalNode,
                    createdAt: publication.date,
                    updatedAt: publication.modified,
                },
            })
        }
    } catch (error) {
        console.error(error)
    }
}

seed()
    .then(() => console.log('🚀 News Articles seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))