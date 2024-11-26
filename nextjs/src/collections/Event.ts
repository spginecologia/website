import { sidebarFields } from '@/fields/sidebar';
import { CollectionConfig } from 'payload';

const Events: CollectionConfig = {
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			label: 'Titulo',
			name: 'title',
			required: true,
			type: 'text',
		},
		{
			label: 'Evento em destaque',
			name: 'is_featured',
			required: false,
			type: 'checkbox',
		},
		{
			label: 'Tipo de Evento',
			name: 'event_type',
			options: [{
				label: 'Eventos SPG',
				value: 'spg',
			}, {
				label: 'Eventos Patrocinados',
				value: 'patrocinado',
			}, {
				label: 'Outros',
				value: 'outros',
			}],
			required: true,
			type: 'select',
		},
		{
			fields: [
				{
					label: 'Data de início',
					name: 'start_date',
					required: true,
					type: 'date',
				},
				{
					label: 'Data de fim',
					name: 'end_date',
					required: true,
					type: 'date',
				},
			],
			type: 'row',
		},
		{
			fields: [
				{
					label: 'Link da página Oficial',
					name: 'link_to_official_page',
					required: false,
					type: 'text',
				},

				{
					label: 'Link do Evento no Facebook',
					name: 'link_to_facebook',
					required: false,
					type: 'text',
				},
				{
					label: 'Link para inscrição',
					name: 'link_to_register',
					required: false,
					type: 'text',
				},
				{
					label: 'Link para Programa',
					name: 'link_to_program',
					required: false,
					type: 'text',
				},
			],
			label: 'Links do Evento',
			name: 'links_group',
			type: 'group',
		},
		{
			fields: [
				{
					label: 'Título',
					name: 'title',
					type: 'text',
				},
				{
					defaultValue: 'text',
					label: 'Tipo de Secção',
					name: 'evento_section_type',
					options: [
						{
							label: 'Conteúdo',
							value: 'text',
						}, {
							label: 'Fotografias',
							value: 'images',
						},
						{
							label: 'Vídeo',
							value: 'video',
						},
						{
							label: 'iFrame',
							value: 'iframe',
						},
					],
					type: 'select',
				},
				{
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === 'text' },
					label: 'Conteúdo',
					name: 'content',
					type: 'richText',
				},

				{
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === 'video' },
					label: 'Url do Vídeo',
					name: 'video',
					required: false,
					type: 'text',
				},
				{
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === 'iframe' },
					label: 'iFrame',
					name: 'iframe',
					required: false,
					type: 'text',
				},
				{
					admin: { condition: (data, siblingData) => siblingData.evento_section_type === 'images' },
					fields: [
						{
							label: 'Imagem',
							name: 'image',
							relationTo: 'media',
							required: true,
							type: 'upload',
						},
						{
							label: 'Legenda',
							name: 'caption',
							required: false,
							type: 'text',
						},
					],
					label: 'Fotografias',
					name: 'images',
					required: false,
					type: 'array',
				},
			],
			label: 'Secções',
			name: 'sections',
			required: false,
			type: 'array',
		},
		...sidebarFields,
	],
	labels: {
		plural: 'Eventos',
		singular: 'Evento',
	},
	slug: 'events',
};

export default Events;
