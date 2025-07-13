/* * */

import { type Field } from 'payload';

/* * */

export const userFieldsContacts: Field[] = [
	{
		fields: [
			{
				defaultValue: true,
				label: 'Enviar Newsletter',
				name: 'send_newsletter',
				type: 'checkbox',
			},
		],
		type: 'row',
	},
	{
		fields: [
			{
				label: 'Telefone',
				name: 'phone',
				type: 'text',
			},
		],
		type: 'row',
	},
	{
		label: 'Morada',
		name: 'address_1',
		type: 'text',
	},
	{
		label: 'Morada (Continuação)',
		name: 'address_2',
		type: 'text',
	},
	{
		fields: [
			{
				label: 'Código Postal',
				name: 'postal_code',
				type: 'text',
			},
			{
				label: 'Cidade',
				name: 'city',
				type: 'text',
			},
			{
				defaultValue: 'Portugal',
				label: 'País',
				name: 'country',
				type: 'text',
			},
		],
		type: 'row',
	},
];
