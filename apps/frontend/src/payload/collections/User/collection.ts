/* * */

import { sendActivationEmail } from '@/payload/collections/User/actions/send-activation-email';
import { updateBrevo } from '@/payload/collections/User/actions/update-brevo';
import { userFieldsActivity } from '@/payload/collections/User/fields/activity';
import { userFieldsContacts } from '@/payload/collections/User/fields/contacts';
import { userFieldsDocuments } from '@/payload/collections/User/fields/documents';
import { userFieldsQuotas } from '@/payload/collections/User/fields/quotas';
import { userFieldsReferences } from '@/payload/collections/User/fields/references';
import { UserOptions } from '@/payload/collections/User/options';
import { type CollectionConfig } from 'payload';

import { updateQuotaStatus } from './actions/update-quota-status';

/* * */

export const Users: CollectionConfig = {

	access: {
		// update: ({ id, req: { user } }) => {
		// 	if (!user || !id) return false;
		// 	if (user.id === id) return true;
		// 	return false;
		// },
	},

	admin: {
		useAsTitle: 'email',
	},

	auth: {

		cookies: {
			domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
			sameSite: 'Strict',
			secure: true,
		},

		maxLoginAttempts: 0,

		// This is being handled by the custom API routes
		forgotPassword: undefined,

		tokenExpiration: 3600 * 24 * 30, // 30 days

	},

	fields: [
		{
			tabs: [
				{
					fields: userFieldsReferences,
					label: 'Referências',
				},
				{
					fields: userFieldsContacts,
					label: 'Contactos',
				},
				{
					fields: userFieldsActivity,
					label: 'Atividade',
				},
				{
					fields: userFieldsDocuments,
					label: 'Documentos',
				},
				{
					fields: userFieldsQuotas,
					label: 'Pagamentos de Quotas',
				},
			],
			type: 'tabs',
		},
		{
			admin: {
				position: 'sidebar',
			},
			defaultValue: 'pending',
			label: 'Estado do Utilizador',
			name: 'account_status',
			options: [...UserOptions.account_status],
			type: 'select',
		},
	],

	hooks: {
		afterChange: [
			updateBrevo,
			sendActivationEmail,
		],
		afterRead: [
			updateQuotaStatus,
		],
	},

	slug: 'users',

};
