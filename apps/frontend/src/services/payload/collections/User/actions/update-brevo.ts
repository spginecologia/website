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
	// If the user has changed their email, first_name, last_name,
	// title or send_newsletter fields, then we need to update
	// the user in Brevo using ext_id value.

	if (previousDoc.email && previousDoc.email !== doc.email) {
		console.log('User changed email:', previousDoc.email, '->', doc.email);
		await brevoUpdateUser(doc, 'tax_id');
		return;
	}

	if (previousDoc.title && previousDoc.title !== doc.title) {
		console.log('User changed title:', previousDoc.title, '->', doc.title);
		await brevoUpdateUser(doc, 'email');
		return;
	}

	if (previousDoc.first_name && previousDoc.first_name !== doc.first_name) {
		console.log('User changed first name:', previousDoc.first_name, '->', doc.first_name);
		await brevoUpdateUser(doc, 'email');
		return;
	}

	if (previousDoc.last_name && previousDoc.last_name !== doc.last_name) {
		console.log('User changed last name:', previousDoc.last_name, '->', doc.last_name);
		await brevoUpdateUser(doc, 'email');
		return;
	}

	if (previousDoc.send_newsletter && previousDoc.send_newsletter !== doc.send_newsletter) {
		console.log('User changed last name:', previousDoc.send_newsletter, '->', doc.send_newsletter);
		await brevoUpdateUser(doc, 'email');
		return;
	}

	//
};
