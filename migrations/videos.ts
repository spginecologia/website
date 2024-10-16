import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/videos.json'
import { convertCategories, convertStringToLexical, LexicalNode } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding videos')
    const payload = await getPayload({ config })

    for (const item of data) {
        try {
            await payload.create({
                collection: 'videos',
                data: {
                    title: item.title.rendered,
                    slug: item.slug,
                    video_file: "6710052a95e3cff04007c104",
                    categories: convertCategories(item.categories),
                    video_authors: item.acf.video_authors,
                    video_rgpd_confirmation: item.acf.video_rgpd_confirmation,
                    video_description: await convertStringToLexical(item.acf.video_description) as LexicalNode,
                    video_introduction: item.acf.video_introduction,
                    video_file_length: item.acf.video_file_length,
                    author: "6710050b95e3cff04007c0c5",
                    video_section: item.acf.video_section as "geral" | "colposcopia_patologia_tracto_genital_inferior" | "endoscopia_ginecologica" | "ginecologia_oncologica" | "menopausa" | "uroginecologia",
                },
            })
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Videos seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))