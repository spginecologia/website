/* * */

import { afterActivateQuota } from '@/services/payload/collections/Quotas/actions';
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
			unique: true,
			validate: (value: number) => {
				// Check if the value is an integer without decimal places.
				if (!Number.isInteger(value)) {
					return 'O ano deve ser um número inteiro, sem casas decimais.';
				}
				return true;
			},
		},
		{
			label: 'Valor (EUR) (sem casas decimais)',
			min: 0,
			name: 'amount',
			required: true,
			type: 'number',
			validate: (value: number) => {
				// Check if the value is an integer without decimal places.
				if (!Number.isInteger(value)) {
					return 'O valor deve ser um número inteiro, sem casas decimais.';
				}
				return true;
			},
		},
		{
			label: 'Ativar Quota',
			name: 'is_enabled',
			required: true,
			type: 'checkbox',
		},
	],

	hooks: {
		afterChange: [
			afterActivateQuota,
		],
	},

	labels: {
		plural: 'Quotas',
		singular: 'Quota',
	},

	slug: 'quotas',

};
