/* * */

import type { GlobalConfig } from 'payload';

/* * */

export const LegalDocuments: GlobalConfig = {

	access: {
		read: () => true,
	},

	fields: [
		{
			admin: {
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
					relationTo: 'document',
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
			],
			label: 'Documentos Legais da Sociedade',
			labels: {
				plural: 'Documentos Legais',
				singular: 'Documento Legal',
			},
			name: 'docs',
			type: 'array',
		},
	],

	label: {
		plural: 'Documentos Legais',
		singular: 'Documento Legal',
	},

	slug: 'legal-documents',

};
