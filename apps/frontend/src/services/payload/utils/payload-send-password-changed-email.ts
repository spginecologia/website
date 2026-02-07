/* * */

import payloadConfig from '@/payload-config';
import { getUserDisplayName } from '@/services/general/get-user-display-name';
import { renderAccountPasswordChangedTemplate } from '@spginecologia/website-emails';
import { getPayload } from 'payload';
import { type User } from 'payload-types';

/**
 * Sends a password changed email notification to the user.
 * @param userData The user data object containing the user's information.
 */
export async function payloadSendPasswordChangedEmail(userData: User) {
	//

	const payload = await getPayload({ config: payloadConfig });
	//
	// Prepare the required email data and send the email to the user.

	const templateData = await renderAccountPasswordChangedTemplate({
		userDisplayName: getUserDisplayName(userData.title, userData.first_name),
	});

	await payload.sendEmail({
		html: templateData.html,
		subject: templateData.subject,
		to: userData.email,
	});

	console.log('Password Changed Email sent to:', userData.email);

	//
}
