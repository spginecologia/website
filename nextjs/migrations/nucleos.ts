import { getPayload } from "payload"
import config from '@payload-config'
import data from './data/nucleo.json'
import { convertStringToLexical } from "./utils"

const seed = async () => {
    console.log('🌱 Seeding nucleos')
    const payload = await getPayload({ config })

    for (const item of data) {
        try {
            await payload.create({
                collection: 'nucleos',
                data: {
                    slug: item.slug,
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
                    recomended_articles: item.acf.seccao_recommended_articles && item.acf.seccao_recommended_articles.map((article: any) => ({
                        title: article.seccao_recommended_articles_title,
                        type: 'url',
                        url: article.seccao_recommended_articles_url,
                        file: article.seccao_recommended_articles_file,
                    })),
                    workshops: item.acf.seccao_workshops && item.acf.seccao_workshops.map((workshop: any) => ({
                        title: workshop.seccao_workshops_title,
                        type: 'file',
                        url: workshop.seccao_workshops_url,
                        file: '6710052a95e3cff04007c104',
                    })),
                    contacts: item.acf.seccao_contacts && item.acf.seccao_contacts.map((contact: any) => ({
                        type: 'email',
                        email: contact.seccao_contacts_email,
                        phone: contact.seccao_contacts_phone,
                    })),
                },
            })
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    }
}

seed()
    .then(() => console.log('🚀 Nucleos seeded'))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))