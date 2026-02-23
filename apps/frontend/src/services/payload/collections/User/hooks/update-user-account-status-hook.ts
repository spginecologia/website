/* * */

import { updateUserAccountStatus } from '@/services/payload/collections/User/actions/update-user-account-status';
import { type CollectionAfterChangeHook } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a user is updated.
 * @param doc The updated user.
 */
export const updateUserAccountStatusHook: CollectionAfterChangeHook<User> = async ({ doc }) => {
	//

	//
	// Refresh the user's account status

	await updateUserAccountStatus(doc.id);

	//
};
