/* * */

import { payloadSendActivationEmail } from '@/utils/payload-send-activation-email';
import { type CollectionAfterChangeHook } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a `user` object is updated.
 * It checks if the `account_status` has changed, and if so,
 * sends an activation email to the user.
 * @param doc The updated user.
 * @param previousDoc The previous user.
 */
export const sendActivationEmail: CollectionAfterChangeHook<User> = async ({ doc, previousDoc }) => {
	//

	//
	// If the user account_status has changed,
	// then we need to send the activation email to the user.

	if (previousDoc.account_status !== doc.account_status) {
		console.log(`User NIF "${doc.tax_id}" account_status changed:`, previousDoc.account_status, '->', doc.account_status);
		if (doc.account_status === 'active') {
			await payloadSendActivationEmail(doc);
		}
	}

	//
};
