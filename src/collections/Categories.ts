import type { CollectionConfig, FieldHook } from "payload";
import { slugify } from "@/lib/utils";
import { slugField } from "@/fields/slug";

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
			name: "description",
			label: "Descrição",
			type: "text",
			required: false,
		},
		slugField(),
	]
}

export default Categories;

