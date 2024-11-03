import { slugField } from "@/fields/slug";
import { CollectionConfig } from "payload";

const Prizes: CollectionConfig = {
    slug: 'prizes',
    labels: {
        singular: 'Prémio',
        plural: 'Prémios',
    },
    admin: {
        useAsTitle: 'title',
    },
    fields: [
        {
            name: 'title',
            label: 'Título',
            type: 'text',
        },
        {
            name: 'content',
            label: 'Conteúdo',
            type: 'richText',
        },
        slugField(),
    ],
}

export default Prizes;