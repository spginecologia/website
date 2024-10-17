import { sidebarFields } from '@/fields/sidebar';
import { CollectionConfig } from 'payload';

const Nucleos: CollectionConfig = {
	slug: 'nucleos',
	labels: {
		singular: 'Núcleo',
		plural: 'Núcleos',
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: 'title',
			label: 'Título',
			type: 'text',
			required: true,
		},
		{
			name: 'mission',
			label: 'Missão desta Secção',
			type: 'text',
			required: true,
		},
		{
			type: 'row',
			fields: [
				{
					name: 'first_column',
					label: '1ª Coluna',
					type: 'group',
					fields: [
						{
							name: 'title',
							label: 'Título da 1ª Coluna',
							type: 'text',
							required: true,
						},
						{
							name: 'message',
							label: 'Mensagem da 1ª Coluna',
							type: 'richText',
							required: true,
						},
					],
				},
				{
					name: 'second_column',
					label: '2ª Coluna',
					type: 'group',
					fields: [
						{
							name: 'title',
							label: 'Título da 2ª Coluna',
							type: 'text',
							required: true,
						},
						{
							name: 'message',
							label: 'Mensagem da 2ª Coluna',
							type: 'richText',
							required: true,
						},
					],
				},
			],
		},
		{
			name: 'members',
			label: 'Órgãos Sociais',
			type: 'array',
			fields: [
				{
					name: 'picture',
					label: 'Picture',
					type: 'upload',
					relationTo: 'media', // Assuming 'media' collection exists
				},
				{
					name: 'name',
					label: 'Nome',
					type: 'text',
					required: true,
				},
				{
					name: 'position',
					label: 'Cargo',
					type: 'text',
				},
				{
					name: 'location',
					label: 'Localização',
					type: 'text',
				},
			],
		},
		{
			name: 'useful_links',
			label: 'Links Úteis',
			type: 'array',
			fields: [
				{
					name: 'title',
					label: 'Título',
					type: 'text',
					required: true,
				},
				{
					name: 'url',
					label: 'URL',
					type: 'text',
					required: true,
				},
			],
		},
		{
			name: 'buttons',
			label: 'Botões',
			type: 'array',
			fields: [
				{
					name: 'title',
					label: 'Título',
					type: 'text',
					required: true,
				},
				{
					name: 'type',
					label: 'Tipo de Botão',
					type: 'radio',
					defaultValue: 'url',
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
				},
				{
					name: 'url',
					label: 'URL',
					type: 'text',
					required: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === 'url',
					},
				},
				{
					name: 'file',
					label: 'Ficheiro',
					type: 'upload',
					required: true,
					relationTo: 'media',
					admin: {
						condition: (_, siblingData) => siblingData.type === 'file',
					},
				},
			],
		},
		{
			name: 'recomended_articles',
			label: 'Artigos Recomendados',
			type: 'array',
			fields: [
				{
					name: 'title',
					label: 'Título',
					type: 'text',
					required: true,
				},
				{
					name: 'type',
					label: 'Tipo de Artigo',
					defaultValue: 'url',
					type: 'radio',
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
				},
				{
					name: 'url',
					label: 'URL',
					type: 'text',
					required: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === 'url',
					},
				},
				{
					name: 'file',
					label: 'Ficheiro',
					type: 'upload',
					required: true,
					relationTo: 'media',
					admin: {
						condition: (_, siblingData) => siblingData.type === 'file',
					},
				},
			],
		},
		{
			name: 'workshops',
			label: 'Workshops',
			type: 'array',
			fields: [
				{
					name: 'title',
					label: 'Título',
					type: 'text',
					required: true,
				},
				{
					name: 'type',
					label: 'Tipo de Workshop',
					defaultValue: 'url',
					type: 'radio',
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
				},
				{
					name: 'url',
					label: 'URL',
					type: 'text',
					required: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === 'url',
					},
				},
				{
					name: 'file',
					label: 'Ficheiro',
					type: 'upload',
					required: true,
					relationTo: 'media',
					admin: {
						condition: (_, siblingData) => siblingData.type === 'file',
					},
				},
			],
		},
		{
			name: 'contacts',
			label: 'Contactos',
			type: 'array',
			fields: [
				{
					name: 'type',
					label: 'Tipo de Contacto',
					defaultValue: 'email',
					type: 'radio',
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
				},
				{
					name: 'email',
					label: 'Email',
					type: 'text',
					required: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === 'email',
					},
				},
				{
					name: 'phone',
					label: 'Telefone',
					type: 'text',
					required: true,
					admin: {
						condition: (_, siblingData) => siblingData.type === 'phone',
					},
				},
			],
		},
		...sidebarFields,
	],
};

export default Nucleos;
