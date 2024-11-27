/* * */

import type { Field } from 'payload';

/* * */

export const featuredImageField: Field = {
	admin: {
		position: 'sidebar',
	},
	label: 'Image de Destaque',
	name: 'featured',
	relationTo: 'media',
	type: 'upload',
};
