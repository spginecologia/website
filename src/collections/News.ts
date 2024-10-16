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
        {
            name: "featured_image",
            label: "Imagem",
            type: "upload",
            relationTo: "media",
            admin: {
                position: "sidebar",
            },
            required: false,
        },
        {
            name: "categories",
            label: "Categorias",
            type: "relationship",
            relationTo: "categories",
            hasMany: true,
            admin: {
                position: "sidebar",
            },
            required: false,
        }
    ]
}

export default News;

