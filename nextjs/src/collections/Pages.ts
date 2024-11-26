import type { CollectionConfig } from 'payload';

export const Pages: CollectionConfig = {

	admin: {
		useAsTitle: 'titulo',
	},
	fields: [
		{
			label: 'Titulo',
			name: 'titulo',
			type: 'text',
		},
		{
			label: 'Slug',
			name: 'slug',
			type: 'text',
		},
		{
			blocks: [
			],
			label: 'Layout',
			name: 'layout',
			type: 'blocks',
		},
	],
	labels: {
		plural: 'Páginas',
		singular: 'Página',
	},
	slug: 'paginas',
};

export default Pages;
