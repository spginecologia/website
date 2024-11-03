import { sidebarFields } from '@/fields/sidebar'
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
			name: "description",
			label: "Descrição",
			type: "richText",
			required: true,
		},
		...sidebarFields,
	]
}

export default Course;