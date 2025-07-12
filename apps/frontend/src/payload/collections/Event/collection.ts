/* * */

import { TextBlock } from '@/src/blocks/TextBlock';
import { featuredImageField } from '@/src/payload/fields/featured-image';
import { isFeaturedField } from '@/src/payload/fields/is-featured';
import { topicsField } from '@/src/payload/fields/topics';
import { type CollectionConfig } from 'payload';

/* * */

export const Event: CollectionConfig = {
	access: {
		read: () => true,
	},
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
			defaultValue: '1st_party',
			label: 'Tipo de Evento',
			name: 'event_type',
			options: [
				{ label: 'Eventos SPG', value: '1st_party' },
				{ label: 'Eventos Patrocinados', value: 'sponsored' },
				{ label: 'Outros', value: 'other' },
			],
			required: true,
			type: 'select',
		},
		{
			fields: [
				{
					label: 'Início do Evento',
					name: 'start_date',
					required: true,
					type: 'date',
				},
				{
					label: 'Fim do Evento',
					name: 'end_date',
					type: 'date',
				},
			],
			type: 'row',
		},
		{
			fields: [
				{
					fields: [
						{
							label: 'Link da Página Oficial',
							name: 'official_page_url',
							type: 'text',
						},
						{
							label: 'Link para Inscrição',
							name: 'signup_url',
							type: 'text',
						},
						{
							label: 'Link do Programa',
							name: 'programme_url',
							type: 'text',
						},
					],
					type: 'row',
				},
			],
			name: 'Links',
			type: 'group',
		},
		{
			blocks: [
				TextBlock,
			],
			name: 'sections',
			type: 'blocks',
		},
		isFeaturedField,
		topicsField,
		featuredImageField,
	],
	labels: {
		plural: 'Eventos',
		singular: 'Evento',
	},
	slug: 'events',
};
