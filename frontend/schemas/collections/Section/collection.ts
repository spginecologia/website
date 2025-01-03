/* * */

import type { CollectionConfig } from 'payload';

import { featuredImageField } from '@/fields/featured-image';
import { topicsField } from '@/fields/topics';

/* * */

export const Sections: CollectionConfig = {
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
		topicsField,
		featuredImageField,
	],
	labels: {
		plural: 'Secções',
		singular: 'Secção',
	},
	slug: 'sections',
};
