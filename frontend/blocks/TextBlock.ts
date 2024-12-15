/* * */

import type { Block } from 'payload';

/* * */

export const TextBlock: Block = {
	fields: [
		{
			name: 'quoteHeader',
			required: true,
			type: 'text',
		},
		{
			name: 'quoteText',
			type: 'text',
		},
		{
			hasMany: true,
			name: 'djfsoks',
			relationTo: 'media',
			type: 'upload',
		},
	],
	imageAltText: 'A nice thumbnail image to show what this block looks like',
	imageURL: 'https://google.com/path/to/image.jpg',
	interfaceName: 'TextBlock', // optional
	labels: {
		plural: 'Textos',
		singular: 'Texto',
	},
	slug: 'Text', // required
};
