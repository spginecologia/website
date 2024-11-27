/* * */

import type { CollectionConfig } from 'payload';

/* * */

export const Categories: CollectionConfig = {
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			label: 'Nome',
			name: 'name',
			required: true,
			type: 'text',
		},
		{
			label: 'Descrição',
			name: 'description',
			required: false,
			type: 'text',
		},
	],
	labels: {
		plural: 'Categorias',
		singular: 'Categoria',
	},
	slug: 'categories',
};
