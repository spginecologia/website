import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/events.json'
import { convertCategories, convertStringToLexical, LexicalNode } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding events')
    const payload = await getPayload({ config })

    for (const item of data) {
        try {
            await payload.create({
                collection: 'events',
                data: {
                    title: item.title.rendered,
                    slug: item.slug,
                    categories: convertCategories(item.categories),
                    start_date: item.acf.evento_start,
                    end_date: item.acf.evento_end,
                    event_type: item.acf.evento_type as "patrocinado" | "outros" | "spg",
                    links_group: {
                        link_to_facebook: typeof item.acf.evento_facebook_link === 'object' ? item.acf.evento_facebook_link.url : undefined,
                        link_to_register: typeof item.acf.evento_signup_link === 'object' ? item.acf.evento_signup_link.url : undefined,
                        link_to_program: typeof item.acf.evento_programme_link === 'object' ? item.acf.evento_programme_link.url : undefined,
                        link_to_official_page: typeof item.acf.evento_official_page_link === 'object' ? item.acf.evento_official_page_link.url : undefined,
                    },
                    sections: item.acf.evento_section ? await Promise.all(item.acf.evento_section.map(async (section: any) => ({
                        title: section.evento_section_title,
                        content: await convertStringToLexical(section.evento_section_content) as LexicalNode,
                        type: section.seccao_type,
                    }))) : null,
                },
            })
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Events seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))