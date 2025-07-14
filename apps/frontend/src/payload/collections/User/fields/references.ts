/* * */

import { UserOptions } from '@/payload/collections/User/options';
import { validateTaxId } from '@/utils/validate-tax-id';
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
				type: 'number',
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
];
