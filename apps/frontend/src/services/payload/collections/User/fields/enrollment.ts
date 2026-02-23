/* * */

import { userFieldsEnrollmentSponsor } from '@/services/payload/collections/User/fields/enrollment-sponsor';
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
				name: 'enrollment_signup_date',
				required: true,
				type: 'date',
				virtual: true,
			},
			{
				label: 'Selo da Aprovação',
				name: 'enrollment_approval_date',
				type: 'date',
			},
			{
				label: 'Sócio SPG desde o ano (inclusive)',
				min: 1975,
				name: 'member_since',
				required: true,
				type: 'number',
			},
		],
		type: 'row',
	},

	{
		label: 'Tipo de Candidatura',
		name: 'enrollment_type',
		options: [...UserOptions.enrollment_type],
		type: 'select',
	},

	{
		admin: {
			condition: (_, siblingData) => siblingData?.enrollment_type === 'effective',
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
				name: 'enrollment_sponsors',
				required: true,
				type: 'array',
			},
		],
		type: 'group',
	},

	{
		admin: {
			condition: (_, siblingData) => siblingData?.enrollment_type === 'affiliate',
		},
		fields: [
			{
				label: 'Carta Curricular',
				name: 'enrollment_curriculum',
				relationTo: 'user-files',
				required: true,
				type: 'upload',
			},
		],
		type: 'group',
	},

];
