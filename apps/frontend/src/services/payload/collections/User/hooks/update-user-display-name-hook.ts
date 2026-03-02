/* * */

import { updateUserDisplayName } from '@/services/payload/collections/User/actions/update-user-display-name';
import { type CollectionAfterChangeHook } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a user is updated.
 * @param doc The updated user.
 */
export const updateUserDisplayNameHook: CollectionAfterChangeHook<User> = async ({ doc }) => {
	//

	//
	// Refresh the user's display name

	await updateUserDisplayName(doc.id);

	//
};
