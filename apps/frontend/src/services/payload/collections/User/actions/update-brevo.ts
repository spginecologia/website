/* * */

import { brevoUpdateUser } from '@/services/brevo/brevo-update-user';
import { type CollectionAfterChangeHook } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a `user` object is updated.
 * It is responsible for updating the user in Brevo when their email changes,
 * @param doc The updated user.
 * @param previousDoc The previous user.
 */
export const updateBrevo: CollectionAfterChangeHook<User> = async ({ doc, previousDoc }) => {
	//

	//
	// If the user has changed their email,
	// then we need to update the user in Brevo using ext_id value.

	if (previousDoc.email && previousDoc.email !== doc.email) {
		console.log('User changed email:', previousDoc.email, '->', doc.email);
		await brevoUpdateUser(doc, 'id');
	}

	//
};
