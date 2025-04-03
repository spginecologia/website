/* * */

import type { Field } from 'payload';

/* * */

export const fileOrUrlFieldSet: Field[] = [

	{
		label: 'Título',
		name: 'title',
		required: true,
		type: 'text',
	},

	{
		defaultValue: 'file',
		label: 'Tipo de Conteúdo',
		name: 'content_type',
		options: [
			{
				label: 'Ficheiro',
				value: 'file',
			},
			{
				label: 'URL',
				value: 'url',
			},
		],
		required: true,
		type: 'radio',
	},

	{
		admin: {
			condition: (_, siblingData) => siblingData?.content_type === 'file',
		},
		label: 'Ficheiro desta Publicação',
		name: 'document',
		relationTo: 'documents',
		type: 'upload',
	},

	{
		admin: {
			condition: (_, siblingData) => siblingData?.content_type === 'url',
		},
		label: 'URL desta Publicação',
		name: 'url',
		type: 'text',
	},

];
