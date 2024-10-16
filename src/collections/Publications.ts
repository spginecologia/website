import { formatSlug } from '@/lib/utils';
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
		{
			name: "categories",
			label: "Categorias",
			type: "relationship",
			relationTo: "categories",
			hasMany: true,
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
				beforeChange: [formatSlug("title")]
			}
		},
		{
			name: "featured_image",
			label: "Imagem de Destaque",
			type: "upload",
			relationTo: "media",
			required: false,
			admin: { position: "sidebar" },
		},
	]
}

export default Publications;