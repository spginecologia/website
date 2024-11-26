import { slugField } from '@/fields/slug';
import { CollectionConfig } from 'payload';

const Prizes: CollectionConfig = {
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			label: 'Título',
			name: 'title',
			type: 'text',
		},
		{
			label: 'Conteúdo',
			name: 'content',
			type: 'richText',
		},
		slugField(),
	],
	labels: {
		plural: 'Prémios',
		singular: 'Prémio',
	},
	slug: 'prizes',
};

export default Prizes;
