/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const Media: CollectionConfig = {

	access: {
		create: () => true,
		read: () => true,
	},

	fields: [
		{
			name: 'alt',
			type: 'text',
		},
	],

	hooks: {
		beforeOperation: [
			({ collection, operation, req }) => {
				if ((operation === 'create' || operation === 'update') && req.file) {
					req.file.name = `${collection.slug}-${Date.now()}`;
				}
			},
		],
	},

	slug: 'media',

	upload: {
		mimeTypes: ['image/*', 'video/*', 'audio/*'],
		staticDir: 'media',
	},

};
