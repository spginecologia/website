/* * */

import { featuredImageField } from '@/services/payload/fields/featured-image';
import { publishedAtField } from '@/services/payload/fields/published-at';
import { topicsField } from '@/services/payload/fields/topics';
import { type CollectionConfig } from 'payload';

/* * */

export const Guidelines: CollectionConfig = {
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
			label: 'Ficheiro deste Consenso',
			name: 'document',
			relationTo: 'documents',
			type: 'upload',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.content_type === 'url',
			},
			label: 'URL deste Consenso',
			name: 'url',
			type: 'text',
		},
		topicsField,
		publishedAtField,
		featuredImageField,
	],
	labels: {
		plural: 'Consensos',
		singular: 'Consenso',
	},
	slug: 'guidelines',
};
