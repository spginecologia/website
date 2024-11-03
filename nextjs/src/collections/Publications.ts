import { sidebarFields } from '@/fields/sidebar';
import type { CollectionConfig } from 'payload'

const Publications: CollectionConfig = {
	labels: {
		singular: "Publicação",
		plural: "Publicações",
	},
	admin: {
		useAsTitle: "title",
	},
	slug: "publications",
	fields: [
		{
			name: "title",
			label: "Título",
			type: "text",
			required: true,
		},
		{
			name: "publication_file",
			label: "Ficheiro da publicação",
			type: "upload",
			relationTo: "media",
			required: true,

		},
		...sidebarFields,
	]
}

export default Publications;