import type { CollectionConfig } from 'payload';

import { sidebarFields } from '@/fields/sidebar';

const Course: CollectionConfig = {
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
			label: 'Descrição',
			name: 'description',
			required: true,
			type: 'richText',
		},
		...sidebarFields,
	],
	labels: {
		plural: 'Cursos',
		singular: 'Curso',
	},
	slug: 'courses',
};

export default Course;
