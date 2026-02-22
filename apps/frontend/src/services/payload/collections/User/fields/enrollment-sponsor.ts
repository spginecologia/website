/* * */

import { UserOptions } from '@/services/payload/collections/User/options';
import { type Field } from 'payload';

/* * */

export const userFieldsEnrollmentSponsor: Field[] = [

	{
		fields: [
			{
				label: 'NIF do Sócio Proponente',
				name: 'sponsor_id',
				relationTo: 'users',
				required: true,
				type: 'relationship',
			},
			{
				defaultValue: 'waiting',
				label: 'Resposta do Sócio Proponente',
				name: 'response_status',
				options: [...UserOptions.enrollment_sponsor_response],
				required: true,
				type: 'select',
			},
		],
		type: 'row',
	},

	{
		fields: [
			{
				label: 'Selo do Envio',
				name: 'request_date',
				type: 'date',
			},
			{
				label: 'Selo da Resposta',
				name: 'response_date',
				type: 'date',
			},
		],
		type: 'row',
	},

];
