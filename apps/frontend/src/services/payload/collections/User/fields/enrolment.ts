/* * */

import { userFieldsEnrollmentSponsor } from '@/services/payload/collections/User/fields/enrolment-sponsor';
import { UserOptions } from '@/services/payload/collections/User/options';
import { type Field } from 'payload';

/* * */

export const userFieldsEnrollment: Field[] = [

	{
		fields: [
			{
				access: {
					create: () => false,
					update: () => false,
				},
				hooks: {
					afterRead: [
						({ data }) => data?.createdAt,
					],
				},
				label: 'Selo da Candidatura',
				name: 'enrolment_signup_date',
				type: 'date',
				virtual: true,
			},
			{
				label: 'Selo da Aprovação',
				name: 'enrolment_approval_date',
				type: 'date',
			},
			{
				label: 'Sócio SPG desde o ano (inclusive)',
				min: 1975,
				name: 'member_since',
				type: 'number',
			},
		],
		type: 'row',
	},

	{
		label: 'Tipo de Candidatura',
		name: 'enrolment_type',
		options: [...UserOptions.enrolment_type],
		type: 'select',
	},

	{
		admin: {
			condition: (_, siblingData) => siblingData?.enrolment_type === 'effective',
		},
		fields: [
			{
				fields: userFieldsEnrollmentSponsor,
				label: 'Sócios Proponentes',
				labels: {
					plural: 'Sócios Proponentes',
					singular: 'Sócio Proponente',
				},
				maxRows: 4,
				minRows: 2,
				name: 'enrolment_sponsors',
				required: true,
				type: 'array',
			},
		],
		type: 'group',
	},

	{
		admin: {
			condition: (_, siblingData) => siblingData?.enrolment_type === 'affiliate',
		},
		fields: [
			{
				label: 'Carta Curricular',
				name: 'enrolment_curriculum',
				relationTo: 'user-files',
				required: true,
				type: 'upload',
			},
		],
		type: 'group',
	},

];
