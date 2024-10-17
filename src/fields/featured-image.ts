import type { Field } from 'payload'

export const featuredImageField: Field = {
    name: "featured",
    label: "Image de Destaque",
    type: "upload",
    relationTo: "media",
    admin: {
        position: "sidebar",
    },
}