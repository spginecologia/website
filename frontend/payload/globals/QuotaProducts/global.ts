/* * */

import { type GlobalConfig } from 'payload';

/* * */

export const QuotaProducts: GlobalConfig = {

	access: {
		read: () => true,
	},

	fields: [
		{
			admin: {
				components: {
					RowLabel: '@/payload/components/QuotaProductRowLabel/index#QuotaProductRowLabel',
				},
				initCollapsed: true,
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
			label: 'Quotas a Pagamento',
			labels: {
				plural: 'Quotas a Pagamento',
				singular: 'Quota',
			},
			name: 'docs',
			type: 'array',
		},
	],

	label: {
		plural: 'Configuração de Quotas',
		singular: 'Quota a Pagamento',
	},

	slug: 'quota-products',

};
