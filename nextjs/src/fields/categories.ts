import type { Field } from 'payload';

export const categoriesField: Field = {
	admin: {
		position: 'sidebar',
	},
	hasMany: true,
	label: 'Categorias',
	name: 'categories',
	relationTo: 'categories',
	type: 'relationship',
};
