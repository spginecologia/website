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

export function capitalizeDate(str: string) {
	var reg = /\b([a-zÁ-ú]{3,})/g;
	return str.replace(reg, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}