import type { CollectionConfig, FieldHook } from 'payload';

import { slugField } from '@/fields/slug';
import { slugify } from '@/lib/utils';

const formatSlug
	= (fallback: string): FieldHook =>
		({ data, originalDoc, value }) => {
			if (typeof value === 'string') {
				return slugify(value);
			}
			const fallbackData = data?.[fallback] || originalDoc?.[fallback];

			if (fallbackData && typeof fallbackData === 'string') {
				return slugify(fallbackData);
			}

			return value;
		};

const Categories: CollectionConfig = {
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			label: 'Nome',
			name: 'name',
			required: true,
			type: 'text',
		},
		{
			label: 'Descrição',
			name: 'description',
			required: false,
			type: 'text',
		},
		slugField('name', { required: true }),
	],
	labels: {
		plural: 'Categorias',
		singular: 'Categoria',
	},
	slug: 'categories',
};

export default Categories;
