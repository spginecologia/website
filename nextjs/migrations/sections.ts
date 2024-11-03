import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/sections.json'
import categoriesMap from './data/categories-map.json'
import { convertStringToLexical } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding sections')
    const payload = await getPayload({ config })

    for (const item of data) {
        try {
            await payload.create({
                collection: 'sections',
                data: {
                    slug: item.slug,
                    categories: Array.isArray(item.categories) ? item.categories.map(id => categoriesMap[id.toString() as keyof typeof categoriesMap]) : [categoriesMap[item.categories]],
                    featured_image: null,
                    title: item.title.rendered,
                    mission: item.acf.seccao_mission,
                    first_column: {
                        title: item.acf.seccao_subheader_1.seccao_subheader_1_title,
                        message: await convertStringToLexical(item.acf.seccao_subheader_1.seccao_subheader_1_text) as { root: { type: string; children: { [k: string]: unknown; type: string; version: number; }[]; direction: "ltr" | "rtl" | null; format: "" | "left" | "start" | "center" | "right" | "end" | "justify"; indent: number; version: number; } },
                    },
                    second_column: {
                        title: item.acf.seccao_subheader_2.seccao_subheader_2_title,
                        message: await convertStringToLexical(item.acf.seccao_subheader_2.seccao_subheader_2_text) as { root: { type: string; children: { [k: string]: unknown; type: string; version: number; }[]; direction: "ltr" | "rtl" | null; format: "" | "left" | "start" | "center" | "right" | "end" | "justify"; indent: number; version: number; } },
                    },
                    members: item.acf.seccao_membros.map((member: any) => ({
                        picture: null,
                        name: member.seccao_membros_name,
                        position: member.seccao_membros_position,
                        location: member.seccao_membros_location,
                    })),
                    useful_links: item.acf.seccao_useful_links && item.acf.seccao_useful_links.map((link: any) => ({
                        title: link.seccao_useful_links_title,
                        url: link.seccao_useful_links_url,
                    })),
                    buttons: item.acf.seccao_buttons && item.acf.seccao_buttons.map((button: any) => ({
                        title: button.seccao_buttons_title,
                        type: "url",
                        url: "CHANGE_ME",
                    })),
                    recomended_articles: item.acf.seccao_recommended_articles,
                    workshops: item.acf.seccao_workshops,
                    contacts: item.acf.seccao_contacts,
                },
            })
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Sections seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))