/* * */

import type { CollectionConfig } from 'payload';

/* * */

export const Documents: CollectionConfig = {
	access: {
		create: () => true,
		read: () => true,
	},
	fields: [],
	slug: 'document',
	upload: true,
};
