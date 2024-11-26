import type { CollectionConfig } from 'payload';

import { sidebarFields } from '@/fields/sidebar';

const Publications: CollectionConfig = {
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			label: 'Título',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			label: 'Ficheiro da publicação',
			name: 'publication_file',
			relationTo: 'media',
			required: true,
			type: 'upload',

		},
		...sidebarFields,
	],
	labels: {
		plural: 'Publicações',
		singular: 'Publicação',
	},
	slug: 'publications',
};

export default Publications;
