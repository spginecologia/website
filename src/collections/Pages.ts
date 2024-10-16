import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {

    labels: {
        singular: "Página",
        plural: "Páginas",
    },
    slug: "paginas",
    fields: [
        {
            name: "titulo",
            label: "Titulo",
            type: "text",
        },
        {
            name: "slug",
            label: "Slug",
            type: "text",
        },
        {
            name: 'layout',
            label: 'Layout',
            type: "blocks",
            blocks: [
            ]
        }
    ],
};

export default Pages;

