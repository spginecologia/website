/* * */

import { User } from '@/payload-types';
import { brevoUpdateUser } from '@/utils/brevo-update-user';
import { type CollectionAfterChangeHook } from 'payload';

/**
 * This function runs after a user object is updated.
 * It is necessary to handle the special case of when the email is changed,
 * since that is the primary key in most systems.
 * @param doc The updated user.
 * @param previousDoc The previous user.
 */
export const afterChangeUser: CollectionAfterChangeHook<User> = async ({ doc, previousDoc }) => {
	//

	//
	// If the user has changed their email,
	// then we need to update the user in Brevo using ext_id value.

	if (previousDoc.email && previousDoc.email !== doc.email) {
		console.log('User changed email:', previousDoc.email, '->', doc.email);
		await brevoUpdateUser(doc, 'id');
	}
	else {
		console.log('User updated:', doc.email);
		await brevoUpdateUser(doc, 'email');
	}

	//
};
