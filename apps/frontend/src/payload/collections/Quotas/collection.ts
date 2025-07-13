/* * */

import { type CollectionConfig } from 'payload';

/* * */

export const Quotas: CollectionConfig = {

	access: {
		read: () => true,
	},

	admin: {
		useAsTitle: 'year',
	},

	fields: [
		{
			label: 'Referente ao Ano',
			min: 1975,
			name: 'year',
			required: true,
			type: 'number',
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
		plural: 'Configuração de Cotas',
		singular: 'Cota',
	},

	slug: 'quotas',

};
