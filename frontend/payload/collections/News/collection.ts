/* * */

import type { CollectionConfig } from 'payload';

import { createdAtField } from '@/payload/fields/created-at';
import { featuredImageField } from '@/payload/fields/featured-image';
import { isFeaturedField } from '@/payload/fields/is-featured';
import { topicsField } from '@/payload/fields/topics';
import { updatedAtField } from '@/payload/fields/updated-at';

/* * */

export const News: CollectionConfig = {

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
			label: 'Resumo curto',
			name: 'summary',
			required: true,
			type: 'textarea',
		},
		{
			label: 'Corpo da Notícia',
			name: 'body',
			required: true,
			type: 'richText',
		},
		isFeaturedField,
		topicsField,
		featuredImageField,
		createdAtField,
		updatedAtField,
	],

	labels: {
		plural: 'Notícias',
		singular: 'Notícia',
	},

	slug: 'news',

	timestamps: false,

};
