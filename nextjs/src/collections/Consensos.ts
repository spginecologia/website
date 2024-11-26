import type { CollectionConfig } from 'payload';

import { sidebarFields } from '@/fields/sidebar';

const Consensos: CollectionConfig = {
	admin: {
		useAsTitle: 'title',
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
			name: 'consenso_type',
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
				condition: (_, siblingData) => siblingData?.consenso_type === 'file',
			},
			label: 'Ficheiro deste Consenso',
			name: 'consenso_file',
			relationTo: 'media',
			type: 'upload',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.consenso_type === 'url',
			},
			label: 'URL deste Consenso',
			name: 'consenso_url',
			type: 'text',
		},
		...sidebarFields,
	],
	labels: {
		plural: 'Consensos',
		singular: 'Consenso',
	},
	slug: 'consensos',
};

export default Consensos;
