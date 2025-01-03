/* * */

import type { Field } from 'payload';

/* * */

export const createdAtField: Field = {

	admin: {
		date: {
			displayFormat: 'yyyy-MM-dd HH:mm',
			pickerAppearance: 'dayAndTime',
		},
		position: 'sidebar',
	},

	hooks: {
		beforeChange: [
			({ previousValue, value }) => {
				if (!previousValue && !value) return new Date();
				if (previousValue && !value) return previousValue;
				return value;
			},
		],
	},

	label: 'Data de Publicação',

	name: 'createdAt',

	required: true,

	type: 'date',
};
