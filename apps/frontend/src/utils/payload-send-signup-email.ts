/* * */

import payloadConfig from '@/services/payload-config';
import { getUserDisplayName } from '@/utils/get-user-display-name';
import { renderAccountSignupTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';
import { type User } from 'payload-types';

/**
 * Finds and returns a User from the database based on the given username (email or Tax ID).
 * @param username The username (email or Tax ID) to search for.
 * @returns The User object if found, or null if not found.
 */
export async function payloadSendSignupEmail(userData: User) {
	//

	const payload = await getPayload({ config: payloadConfig });

	//
	// Prepare the required email data and send the email to the user.

	const templateData = await renderAccountSignupTemplate({
		userDisplayName: getUserDisplayName(userData.title, userData.first_name),
	});

	await payload.sendEmail({
		html: templateData.html,
		subject: templateData.subject,
		to: userData.email,
	});

	console.log('Signup Confirmation Email sent to:', userData.email);

	//
}
