import { sidebarFields } from '@/fields/sidebar';
import { CollectionConfig } from 'payload';

const Nucleos: CollectionConfig = {
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
			label: 'Missão desta Secção',
			name: 'mission',
			required: true,
			type: 'text',
		},
		{
			fields: [
				{
					fields: [
						{
							label: 'Título da 1ª Coluna',
							name: 'title',
							required: true,
							type: 'text',
						},
						{
							label: 'Mensagem da 1ª Coluna',
							name: 'message',
							required: true,
							type: 'richText',
						},
					],
					label: '1ª Coluna',
					name: 'first_column',
					type: 'group',
				},
				{
					fields: [
						{
							label: 'Título da 2ª Coluna',
							name: 'title',
							required: true,
							type: 'text',
						},
						{
							label: 'Mensagem da 2ª Coluna',
							name: 'message',
							required: true,
							type: 'richText',
						},
					],
					label: '2ª Coluna',
					name: 'second_column',
					type: 'group',
				},
			],
			type: 'row',
		},
		{
			fields: [
				{
					label: 'Picture',
					name: 'picture',
					relationTo: 'media', // Assuming 'media' collection exists
					type: 'upload',
				},
				{
					label: 'Nome',
					name: 'name',
					required: true,
					type: 'text',
				},
				{
					label: 'Cargo',
					name: 'position',
					type: 'text',
				},
				{
					label: 'Localização',
					name: 'location',
					type: 'text',
				},
			],
			label: 'Órgãos Sociais',
			name: 'members',
			type: 'array',
		},
		{
			fields: [
				{
					label: 'Título',
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					label: 'URL',
					name: 'url',
					required: true,
					type: 'text',
				},
			],
			label: 'Links Úteis',
			name: 'useful_links',
			type: 'array',
		},
		{
			fields: [
				{
					label: 'Título',
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					defaultValue: 'url',
					label: 'Tipo de Botão',
					name: 'type',
					options: [
						{
							label: 'URL',
							value: 'url',
						},
						{
							label: 'Ficheiro',
							value: 'file',
						},
					],
					type: 'radio',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'url',
					},
					label: 'URL',
					name: 'url',
					required: true,
					type: 'text',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'file',
					},
					label: 'Ficheiro',
					name: 'file',
					relationTo: 'media',
					required: true,
					type: 'upload',
				},
			],
			label: 'Botões',
			name: 'buttons',
			type: 'array',
		},
		{
			fields: [
				{
					label: 'Título',
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					defaultValue: 'url',
					label: 'Tipo de Artigo',
					name: 'type',
					options: [
						{
							label: 'URL',
							value: 'url',
						},
						{
							label: 'Ficheiro',
							value: 'file',
						},
					],
					type: 'radio',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'url',
					},
					label: 'URL',
					name: 'url',
					required: true,
					type: 'text',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'file',
					},
					label: 'Ficheiro',
					name: 'file',
					relationTo: 'media',
					required: true,
					type: 'upload',
				},
			],
			label: 'Artigos Recomendados',
			name: 'recomended_articles',
			type: 'array',
		},
		{
			fields: [
				{
					label: 'Título',
					name: 'title',
					required: true,
					type: 'text',
				},
				{
					defaultValue: 'url',
					label: 'Tipo de Workshop',
					name: 'type',
					options: [
						{
							label: 'URL',
							value: 'url',
						},
						{
							label: 'Ficheiro',
							value: 'file',
						},
					],
					type: 'radio',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'url',
					},
					label: 'URL',
					name: 'url',
					required: true,
					type: 'text',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'file',
					},
					label: 'Ficheiro',
					name: 'file',
					relationTo: 'media',
					required: true,
					type: 'upload',
				},
			],
			label: 'Workshops',
			name: 'workshops',
			type: 'array',
		},
		{
			fields: [
				{
					defaultValue: 'email',
					label: 'Tipo de Contacto',
					name: 'type',
					options: [
						{
							label: 'Email',
							value: 'email',
						},
						{
							label: 'Telefone',
							value: 'phone',
						},
					],
					type: 'radio',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'email',
					},
					label: 'Email',
					name: 'email',
					required: true,
					type: 'text',
				},
				{
					admin: {
						condition: (_, siblingData) => siblingData.type === 'phone',
					},
					label: 'Telefone',
					name: 'phone',
					required: true,
					type: 'text',
				},
			],
			label: 'Contactos',
			name: 'contacts',
			type: 'array',
		},
		...sidebarFields,
	],
	labels: {
		plural: 'Núcleos',
		singular: 'Núcleo',
	},
	slug: 'nucleos',
};

export default Nucleos;
