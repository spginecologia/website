/* * */

import type { CollectionConfig } from 'payload';

import { featuredImageField } from '@/fields/featured-image';
import { topicsField } from '@/fields/topics';

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
			relationTo: 'document',
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
		featuredImageField,
	],
	labels: {
		plural: 'Consensos',
		singular: 'Consenso',
	},
	slug: 'guidelines',
};
