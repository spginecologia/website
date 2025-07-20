/* * */

import payloadConfig from '@/services/payload-config';
import { getUserDisplayName } from '@/utils/get-user-display-name';
import { navigationGetUrlWithRedirectParam } from '@/utils/navigation-handle-redirect-param';
import { renderAccountActivationTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';
import { type User } from 'payload-types';

/**
 * Finds and returns a User from the database based on the given username (email or Tax ID).
 * @param username The username (email or Tax ID) to search for.
 * @returns The User object if found, or null if not found.
 */
export async function payloadSendActivationEmail(userData: User) {
	//

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

	console.log('Activation Email sent to:', userData.email);

	//
}
