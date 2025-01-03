/* * */

import type { CollectionConfig } from 'payload';

import { featuredImageField } from '@/fields/featured-image';
import { isFeaturedField } from '@/fields/is-featured';
import { topicsField } from '@/fields/topics';
import { VideoOptions } from '@/schemas/collections/Video/options';

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
			// required: true,
			type: 'text',
		},
		{
			label: 'Estado',
			name: 'status',
			options: [
				{ label: 'Rascunho', value: 'draft' },
				{ label: 'Aguarda Revisão', value: 'in_review' },
				{ label: 'Aprovado', value: 'approved' },
				{ label: 'Rejeitado', value: 'rejected' },
			],
			// required: true,
			type: 'select',
		},
		{
			label: 'Ficheiro do Vídeo',
			name: 'video_file',
			relationTo: 'video-files',
			// required: true,
			type: 'relationship',
		},
		{
			label: 'Declaração Assinada',
			name: 'declaration_file',
			relationTo: 'media',
			type: 'relationship',
		},
		{
			label: 'Autores',
			name: 'authors',
			// required: true,
			type: 'text',
		},
		{
			label: 'Área de Interesse',
			name: 'section',
			options: VideoOptions.section,
			// required: true,
			type: 'select',
		},
		{
			label: 'Introdução deste Vídeo',
			name: 'introduction',
			// required: true,
			type: 'textarea',
		},
		{
			label: 'Descrição deste Vídeo',
			name: 'description',
			type: 'richText',
		},
		{
			label: 'Utilizador que Publicou',
			name: 'publisher',
			relationTo: 'users',
			// required: true,
			type: 'relationship',
		},
		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 0,
			label: 'Visualizações',
			name: 'views',
			type: 'number',
		},
		isFeaturedField,
		topicsField,
		featuredImageField,
	],

	labels: {
		plural: 'Videos',
		singular: 'Video',
	},

	slug: 'videos',

};
