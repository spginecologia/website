/* * */

import { sendActivationEmail } from '@/services/payload/collections/User/actions/send-activation-email';
import { updateBrevo } from '@/services/payload/collections/User/actions/update-brevo';
import { updateQuotaStatus } from '@/services/payload/collections/User/actions/update-quota-status';
import { userFieldsActivity } from '@/services/payload/collections/User/fields/activity';
import { userFieldsContacts } from '@/services/payload/collections/User/fields/contacts';
import { userFieldsEnrollment } from '@/services/payload/collections/User/fields/enrollment';
import { userFieldsQuotas } from '@/services/payload/collections/User/fields/quotas';
import { userFieldsReferences } from '@/services/payload/collections/User/fields/references';
import { userFieldsSidebar } from '@/services/payload/collections/User/fields/sidebar';
import { payloadAccessControl } from '@/services/payload/utils/payload-access-control';
import { type CollectionConfig } from 'payload';

/* * */

export const Users: CollectionConfig = {

	access: {
		admin({ req }) {
			return payloadAccessControl('admin', req);
		},
	},

	admin: {

		components: {
			listMenuItems: [
				'@/services/payload/collections/User/components/UsersListExportAllButton/index#UsersListExportAllButton',
				'@/services/payload/collections/User/components/UsersListExportUnpaidButton/index#UsersListExportUnpaidButton',
				'@/services/payload/collections/User/components/UsersListExportWaitingButton/index#UsersListExportWaitingButton',
			],
		},

		defaultColumns: [
			'tax_id',
			'display_name',
			'email',
			'account_status',
			'account_role',
			'createdAt',
		],

		groupBy: true,

		listSearchableFields: [
			'tax_id',
			'first_name',
			'last_name',
			'email',
			'phone',
		],

		pagination: {
			defaultLimit: 100,
			limits: [50, 100, 300, 500],
		},

		useAsTitle: 'display_name',

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
					fields: userFieldsQuotas,
					label: 'Pagamentos de Quotas',
				},
				{
					fields: userFieldsEnrollment,
					label: 'Candidatura',
				},
			],
			type: 'tabs',
		},

		...userFieldsSidebar,

	],

	hooks: {
		afterChange: [
			updateBrevo,
			sendActivationEmail,
		],
		afterLogin: [
			updateQuotaStatus,
		],
	},

	labels: {
		plural: 'Sócios',
		singular: 'Sócio',
	},

	slug: 'users',

};
