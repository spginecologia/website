/* * */

import { isActiveField } from '@/payload/fields/is-active';
import { isFeaturedField } from '@/payload/fields/is-featured';
import { type CollectionConfig } from 'payload';

/* * */

export const Links: CollectionConfig = {

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
			label: 'Subtítulo',
			name: 'subtitle',
			required: false,
			type: 'text',
		},
		{
			label: 'URL de destino',
			name: 'href',
			required: true,
			type: 'text',
		},
		{
			defaultValue: 0,
			label: 'Ordenação',
			name: 'sort_order',
			required: true,
			type: 'number',
		},
		isActiveField,
		isFeaturedField,
	],

	labels: {
		plural: 'Links',
		singular: 'Link',
	},

	slug: 'links',

};
