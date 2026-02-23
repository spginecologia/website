/* * */

import payloadConfig from '@/payload-config';
import { payloadSendActivationEmail } from '@/services/payload/utils/payload-send-activation-email';
import { type CollectionAfterChangeHook, getPayload } from 'payload';
import { type User } from 'payload-types';

/**
 * This function runs after a `user` object is updated.
 * It checks if the `account_status` has changed, and if so,
 * sends an activation email to the user and updates the
 * "enrollment_approval_date" field with the current date.
 * @param doc The updated user.
 * @param previousDoc The previous user.
 */
export const updateEnrollmentStatus: CollectionAfterChangeHook<User> = async ({ doc, previousDoc }) => {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Skip if the account_status has not changed
	// or if it has changed to a value other than "active".

	if (previousDoc?.account_status === doc.account_status) return;

	if (doc.account_status !== 'active') return;

	//
	// If the user account_status has changed to "active",
	// then we need to send the activation email to the user
	// and update the "enrollment_approval_date" field with the current date.

	console.log(`User NIF "${doc.tax_id}" account_status changed:`, previousDoc?.account_status, '->', doc.account_status);

	await payloadSendActivationEmail(doc);

	await payload.update({
		collection: 'users',
		data: {
			enrollment_approval_date: new Date().toISOString(),
		},
		id: doc.id,
	});

	//
};
