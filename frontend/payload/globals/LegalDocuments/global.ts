/* * */

import { fileOrUrlFieldSet } from '@/payload/fields/file-or-url';
import { type GlobalConfig } from 'payload';

/* * */

export const LegalDocuments: GlobalConfig = {

	access: {
		read: () => true,
	},

	fields: [
		{
			admin: {
				components: {
					RowLabel: '@/payload/components/FileOrUrlRowLabel/index#FileOrUrlRowLabel',
				},
				initCollapsed: true,
			},
			fields: fileOrUrlFieldSet,
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
