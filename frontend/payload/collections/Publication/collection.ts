/* * */

import type { CollectionConfig } from 'payload';

import { featuredImageField } from '@/payload/fields/featured-image';
import { topicsField } from '@/payload/fields/topics';

/* * */

export const Publications: CollectionConfig = {
	access: {
		read: () => true,
	},
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
			defaultValue: 'file',
			label: 'Tipo de Conteúdo',
			name: 'content_type',
			options: [
				{
					label: 'Ficheiro',
					value: 'file',
				},
				{
					label: 'URL',
					value: 'url',
				},
			],
			required: true,
			type: 'radio',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.content_type === 'file',
			},
			label: 'Ficheiro desta Publicação',
			name: 'document',
			relationTo: 'document',
			type: 'upload',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.content_type === 'url',
			},
			label: 'URL desta Publicação',
			name: 'url',
			type: 'text',
		},
		topicsField,
		featuredImageField,
	],
	labels: {
		plural: 'Publicações',
		singular: 'Publicação',
	},
	slug: 'publications',
};
