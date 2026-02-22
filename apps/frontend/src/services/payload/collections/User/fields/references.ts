/* * */

import { validateTaxId } from '@/services/general/validate-tax-id';
import { UserOptions } from '@/services/payload/collections/User/options';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { type Field } from 'payload';

/* * */

export const userFieldsReferences: Field[] = [

	{
		fields: [
			{
				label: 'Título',
				name: 'title',
				options: [...UserOptions.title],
				type: 'select',
			},
			{
				label: 'Primeiro Nome',
				name: 'first_name',
				type: 'text',
			},
			{
				label: 'Apelido(s)',
				name: 'last_name',
				type: 'text',
			},
		],
		type: 'row',
	},

	{
		fields: [
			{
				label: 'Número de Contribuinte',
				name: 'tax_id',
				required: true,
				type: 'text',
				unique: true,
				validate: (value: string) => {
					return validateTaxId(value, false, ['singular']) || 'Número de Contribuinte deve ser um número de 9 caracteres.';
				},
			},
			{
				label: 'Número de Cédula Médica',
				name: 'medical_id',
				type: 'text',
			},
		],
		type: 'row',
	},

	{
		fields: [
			{
				label: 'Data de Nascimento',
				name: 'birthday',
				type: 'date',
			},
		],
		type: 'row',
	},

	{
		access: {
			create: () => false,
			update: () => false,
		},
		defaultValue: '-',
		hooks: {
			afterRead: [
				({ data }) => {
					if (!data) return data;
					return getUserDisplayName(data.title, data.first_name, data.last_name);
				},
			],
		},
		label: 'Nome Completo',
		name: 'display_name',
		type: 'text',
		virtual: true,
	},

	{
		fields: [
			{
				admin: {
					description: 'Os sócios que são Internos não pagam quotas se a Quota for para um ano entre o ano de início e fim do Internato.',
				},
				label: 'Definir como Interno',
				name: 'is_intern',
				type: 'checkbox',
			},
			{
				fields: [
					{
						label: 'Interno desde o ano (inclusive)',
						min: 1975,
						name: 'intern_since',
						type: 'number',
					},
					{
						label: 'Interno até ao ano (inclusive)',
						min: 1975,
						name: 'intern_until',
						type: 'number',
					},
				],
				type: 'row',
			},
			{
				label: 'Prova de Internato',
				name: 'intern_proof',
				relationTo: 'internal-documents',
				type: 'upload',
			},
		],
		type: 'group',
	},

];
