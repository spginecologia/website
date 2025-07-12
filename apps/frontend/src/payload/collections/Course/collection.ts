/* * */

import { featuredImageField } from '@/payload/fields/featured-image';
import { topicsField } from '@/payload/fields/topics';
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
			label: 'Ficheiro deste Curso',
			name: 'document',
			relationTo: 'documents',
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
		topicsField,
		featuredImageField,
	],
	labels: {
		plural: 'Palestras & Cursos',
		singular: 'Curso',
	},
	slug: 'courses',
};
