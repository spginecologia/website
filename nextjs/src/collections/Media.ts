import type { CollectionConfig } from 'payload';

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
	slug: 'media',
	upload: true,
};
