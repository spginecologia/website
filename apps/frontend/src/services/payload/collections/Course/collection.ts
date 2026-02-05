/* * */

import { featuredImageField } from '@/services/payload/fields/featured-image';
import { publishedAtField } from '@/services/payload/fields/published-at';
import { topicsField } from '@/services/payload/fields/topics';
import { type CollectionConfig } from 'payload';

/* * */

export const Courses: CollectionConfig = {
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
			defaultValue: 'video',
			label: 'Tipo de Conteúdo',
			name: 'content_type',
			options: [
				{
					label: 'Vídeo',
					value: 'video',
				},
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
				condition: (_, siblingData) => siblingData?.content_type === 'video',
			},
			label: 'Vídeo deste Curso',
			name: 'video',
			relationTo: 'course-files',
			type: 'upload',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.content_type === 'file',
			},
			label: 'Ficheiro deste Curso',
			name: 'document',
			relationTo: 'course-files',
			type: 'upload',
		},
		{
			admin: {
				condition: (_, siblingData) => siblingData?.content_type === 'url',
			},
			label: 'URL deste Curso',
			name: 'url',
			type: 'text',
		},
		{
			label: 'Introdução',
			name: 'introduction',
			type: 'textarea',
		},
		topicsField,
		publishedAtField,
		featuredImageField,
	],
	labels: {
		plural: 'Palestras & Cursos',
		singular: 'Curso',
	},
	slug: 'courses',
};
