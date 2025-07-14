/* * */

import { mollieUpdateQuotaStatus } from '@/scripts/mollie-update-quota-status';
import { type CollectionAfterReadHook } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a `user` object is updated.
 * It checks if the `account_status` has changed, and if so,
 * sends an activation email to the user.
 * @param doc The updated user.
 * @param previousDoc The previous user.
 */
export const updateQuotaStatus: CollectionAfterReadHook<User> = async ({ doc }) => {
	//

	//
	// If the user account_status has changed,
	// then we need to send the activation email to the user.

	await mollieUpdateQuotaStatus(doc);

	//
};
