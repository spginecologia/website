/* * */

import payloadConfig from '@/payload-config';
import { navigationGetUrlWithRedirectParam } from '@/services/navigation/navigation-handle-redirect-param';
import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { renderAccountActivationTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';
import { type User } from 'payload-types';

/**
 * Finds and returns a User from the database based on the given username (email or Tax ID).
 * @param userData An object containing the user's email and tax_id.
 * @returns The User object if found, or null if not found.
 */
export async function payloadSendActivationEmail(userData: User) {
	//

	if (!userData.email) {
		throw new Error('No email provided. Skipping...');
	}

	const payload = await getPayload({ config: payloadConfig });

	//
	// Request a reset password token for the given user.

	const tokenresult = await payload.forgotPassword({
		collection: 'users',
		data: { email: userData.email },
		disableEmail: true, // DO NOT send the email
	});

	if (!tokenresult) {
		throw new Error('Failed to generate a reset password token.');
	}

	//
	// Prepare the template and send the email to the user.

	const templateData = await renderAccountActivationTemplate({
		resetPasswordUrl: navigationGetUrlWithRedirectParam(`${process.env.NEXT_PUBLIC_URL}/reset?token=${tokenresult}`),
		userDisplayName: getUserDisplayName(userData.title, userData.first_name),
	});

	await payload.sendEmail({
		html: templateData.html,
		subject: templateData.subject,
		to: userData.email,
	});

	//
	// Update the user's "enrollment_approval_date" field with the current date
	// to indicate that the activation email has been sent.

	await payload.update({
		collection: 'users',
		data: {
			enrollment_approval_date: new Date().toISOString(),
		},
		id: userData.id,
	});

	console.log('Activation Email sent to:', userData.email);

	//
}
