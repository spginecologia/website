import type { Field } from 'payload'

export const categoriesField: Field = {
    name: "categories",
    label: "Categorias",
    type: "relationship",
    relationTo: "categories",
    hasMany: true,
    admin: {
        position: "sidebar",
    },
}