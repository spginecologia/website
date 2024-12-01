/* * */

import type { CollectionConfig } from 'payload';

/* * */

export const VideoFiles: CollectionConfig = {
	access: {
		create: () => true,
		read: () => true,
	},
	fields: [
		{
			name: 'duration',
			type: 'number',
		},
	],
	slug: 'video-files',
	upload: true,
};
