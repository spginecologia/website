/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const Products: CollectionConfig = {

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
			label: 'Valor',
			min: 0,
			name: 'amount',
			required: true,
			type: 'number',
		},
		{
			label: 'Ativar Quota',
			name: 'is_enabled',
			required: true,
			type: 'checkbox',
		},
	],

	labels: {
		plural: 'Configuração de Produtos',
		singular: 'Produto',
	},

	slug: 'products',

};
