import type { CollectionConfig } from 'payload';

import { sidebarFields } from '@/fields/sidebar';

const News: CollectionConfig = {
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			label: 'Titulo',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			label: 'Noticia em destaque',
			name: 'is_featured',
			required: false,
			type: 'checkbox',
		},
		{
			label: 'Conteúdo ',
			name: 'content',
			required: true,
			type: 'richText',
		},
		...sidebarFields,
	],
	labels: {
		plural: 'Noticias',
		singular: 'Noticia',
	},
	slug: 'noticias',
	versions: {
		drafts: true,
	},
};

export default News;
