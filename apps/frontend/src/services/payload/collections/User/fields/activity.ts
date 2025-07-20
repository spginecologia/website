/* * */

import { UserOptions } from '@/services/payload/collections/User/options';
import { type Field } from 'payload';

/* * */

export const userFieldsActivity: Field[] = [
	{
		label: 'Local de Trabalho Principal',
		name: 'workplace_primary',
		type: 'text',
	},
	{
		label: 'Local de Trabalho Secundário',
		name: 'workplace_secondary',
		type: 'text',
	},
	{
		hasMany: true,
		label: 'Áreas de Interesse',
		name: 'subscribed_sections',
		options: [...UserOptions.subscribed_sections],
		type: 'select',
	},
];
