import { slugify } from '@/lib/utils'
import type { CollectionConfig, FieldHook } from 'payload'

const formatSlug =
	(fallback: string): FieldHook =>
		({ value, originalDoc, data }) => {
			if (typeof value === 'string') {
				return slugify(value)
			}
			const fallbackData = data?.[fallback] || originalDoc?.[fallback]

			if (fallbackData && typeof fallbackData === 'string') {
				return slugify(fallbackData)
			}

			return value
		}


const Consensos: CollectionConfig = {
	labels: {
		singular: "Consenso",
		plural: "Consensos",
	},
	slug: "consensos",
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			required: true,
			unique: true,
			admin: { position: "sidebar" },
			hooks: {
				beforeChange: [formatSlug("title")],
			},
		},
		{
			name: "consenso_type",
			label: "Tipo de Conteúdo",
			type: "radio",
			defaultValue: "file",
			required: true,
			options: [
				{
					label: "Ficheiro",
					value: "file",
				},
				{
					label: "URL",
					value: "url",
				},
			],
		},
		{
			name: "consenso_file",
			label: "Ficheiro deste Consenso",
			type: "upload",
			relationTo: "media",
			admin: {
				condition: (_, siblingData) => siblingData?.consenso_type === "file",
			},
		},
		{
			name: "consenso_url",
			label: "URL deste Consenso",
			type: "text",
			admin: {
				condition: (_, siblingData) => siblingData?.consenso_type === "url",
			},
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
		},
		{
			name: "featured",
			label: "Image de Destaque",
			type: "upload",
			relationTo: "media",
			admin: {
				position: "sidebar",
			},
		}
	],
}

export default Consensos;