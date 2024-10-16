import { FieldHook } from "payload"

export function slugify(text: string) {
	return text
		.replace(/ /g, '-')
		.replace(/[^\w-/]+/g, '')
		.toLowerCase()
}

export const formatSlug =
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


