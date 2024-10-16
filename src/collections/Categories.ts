import type { CollectionConfig, FieldHook } from "payload";
import { slugify } from "@/lib/utils";

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

const Categories: CollectionConfig = {
	labels: {
		singular: "Categoria",
		plural: "Categorias",
	},
	slug: "categories",
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			label: "Nome",
			type: "text",
			required: true,
		},
		{
			name: "slug",
			label: "Slug",
			type: "text",
			admin: {
				position: "sidebar",
			},
			hooks: {
				beforeChange: [formatSlug("name")]
			}
		},
		{
			name: "description",
			label: "Descrição",
			type: "text",
			required: false,
		},
	]
}

export default Categories;

