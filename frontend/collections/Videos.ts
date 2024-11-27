/* * */

import type { CollectionConfig } from 'payload';

import { categoriesField } from '@/fields/categories';
import { featuredImageField } from '@/fields/featured-image';

/* * */

export const Videos: CollectionConfig = {
	access: {
		create: () => true,
		read: () => true,
	},
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
			fields: [
				{
					defaultValue: false,
					label: 'Destacar?',
					name: 'video_featured',
					type: 'checkbox',
				},
				{
					label: 'Confirmação RGPD',
					name: 'video_rgpd_confirmation',
					required: true,
					type: 'checkbox',
				},
			],
			type: 'row',
		},
		{
			admin: {
				position: 'sidebar',
			},
			label: 'Duração do Vídeo',
			// Todo: Add a hook to get the video duration from the video file
			name: 'video_file_length',
			required: false,
			type: 'text',
		},
		{
			label: 'Ficheiro do Vídeo',
			name: 'video_file',
			relationTo: 'media',
			required: true,
			type: 'upload',
		},
		{
			label: 'Declaração Assinada',
			name: 'video_declaration_signed',
			relationTo: 'media',
			type: 'upload',
		},
		{
			label: 'Autores',
			name: 'video_authors',
			required: true,
			type: 'text',
		},
		{
			label: 'Área de Interesse',
			name: 'video_section',
			options: [
				{ label: 'Geral', value: 'geral' },
				{
					label: 'Colposcopia Patologia Tracto Genital Inferior',
					value: 'colposcopia_patologia_tracto_genital_inferior',
				},
				{ label: 'Endoscopia Ginecológica', value: 'endoscopia_ginecologica' },
				{ label: 'Ginecologia Oncológica', value: 'ginecologia_oncologica' },
				{ label: 'Menopausa', value: 'menopausa' },
				{ label: 'Uroginecologia', value: 'uroginecologia' },
			],
			required: true,
			type: 'select',
		},
		{
			label: 'Introdução deste Vídeo',
			name: 'video_introduction',
			required: true,
			type: 'textarea',
		},
		{
			label: 'Descrição deste Vídeo',
			name: 'video_description',
			required: true,
			type: 'richText',
		},
		{
			label: 'Autor',
			name: 'author',
			relationTo: 'users',
			required: true,
			type: 'relationship',
		},
		categoriesField,
		featuredImageField,
	],
	labels: {
		plural: 'Videos',
		singular: 'Video',
	},
	slug: 'videos',
};
