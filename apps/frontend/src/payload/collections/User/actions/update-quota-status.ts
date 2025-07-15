/* * */

import { mollieUpdateQuotaStatus } from '@/services/mollie/mollie-update-quota-status';
import { type CollectionAfterLoginHook } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a user logs in.
 * @param doc The updated user.
 * @param previousDoc The previous user.
 */
export const updateQuotaStatus: CollectionAfterLoginHook<User> = async ({ user }) => {
	//

	//
	// Refresh the user's quota status with Mollie

	await mollieUpdateQuotaStatus(user.id);

	//
};
