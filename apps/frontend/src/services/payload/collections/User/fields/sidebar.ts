/* * */

import { UserOptions } from '@/services/payload/collections/User/options';
import { type Field } from 'payload';

/* * */

export const userFieldsSidebar: Field[] = [

	{
		admin: {
			position: 'sidebar',
		},
		defaultValue: 'pending',
		label: 'Estado do Sócio',
		name: 'account_status',
		options: [...UserOptions.account_status],
		type: 'select',
	},

	{
		admin: {
			position: 'sidebar',
		},
		defaultValue: false,
		label: 'Permissões do Sócio',
		name: 'account_role',
		options: [...UserOptions.account_role],
		type: 'select',
	},

];
