import { sidebarFields } from '@/fields/sidebar';
import type { CollectionConfig } from 'payload'

const News: CollectionConfig = {
    labels: {
        singular: "Noticia",
        plural: "Noticias",
    },
    slug: "noticias",
    admin: {
        useAsTitle: "title",
    },
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: "title",
            label: "Titulo",
            type: "text",
            required: true,
        },
        {
            name: "is_featured",
            label: "Noticia em destaque",
            type: "checkbox",
            required: false,
        },
        {
            name: "content",
            label: "Conteúdo ",
            type: "richText",
            required: true,
        },
        ...sidebarFields,
    ]
}

export default News;

