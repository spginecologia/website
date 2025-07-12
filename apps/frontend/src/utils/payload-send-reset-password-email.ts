/* * */

import payloadConfig from '@/payload-config';
import { type User } from '@/payload-types';
import { getNotificationActionTemplate } from '@/payload/email/notification-action.template';
import { navigationGetUrlWithRedirectParam } from '@/utils/navigation-handle-redirect-param';
import { getPayload } from 'payload';

/**
 * Finds and returns a User from the database based on the given username (email or Tax ID).
 * @param username The username (email or Tax ID) to search for.
 * @returns The User object if found, or null if not found.
 */
export async function payloadSendResetPasswordEmail(userData: User, redirectTo?: string) {
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
	// Prepare the required email data and send the email to the user.

	const actionUrl = navigationGetUrlWithRedirectParam(`${process.env.NEXT_PUBLIC_URL}/reset?token=${tokenresult}`, redirectTo);

	const htmlData = getNotificationActionTemplate({
		action_title: 'Definir Nova Password',
		action_url: actionUrl,
		content: 'Clique no botão abaixo para redefinir a sua password.',
		title: 'Escolha uma nova Password',
	});

	await payload.sendEmail({
		html: htmlData,
		subject: 'Recuperação de Password SPG',
		to: userData.email,
	});

	console.log('Reset Password Email sent to:', userData.email);

	//
}
