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

const Course: CollectionConfig = {
	slug: "courses",
	labels: {
		singular: "Curso",
		plural: "Cursos",
	},
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
			name: "featured_image",
			label: "Imagem de Destaque",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: { position: "sidebar" },
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
			name: "categories",
			label: "Categorias",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
			admin: { position: "sidebar" },
		},
		{
			name: "description",
			label: "Descrição",
			type: "richText",
			required: true,
		},
	]
}

export default Course;