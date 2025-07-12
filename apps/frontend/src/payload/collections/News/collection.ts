/* * */

import { featuredImageField } from '@/src/payload/fields/featured-image';
import { isFeaturedField } from '@/src/payload/fields/is-featured';
import { publishedAtField } from '@/src/payload/fields/published-at';
import { topicsField } from '@/src/payload/fields/topics';
import { updatedAtField } from '@/src/payload/fields/updated-at';
import { type CollectionConfig } from 'payload';

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
		publishedAtField,
		updatedAtField,
	],

	labels: {
		plural: 'Notícias',
		singular: 'Notícia',
	},

	slug: 'news',

	timestamps: false,

};
