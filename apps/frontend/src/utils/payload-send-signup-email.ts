/* * */

import { type User } from '@/payload-types';
import { getNotificationPlainTemplate } from '@/payload/email/notification-plain.template';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

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

	const htmlData = getNotificationPlainTemplate({
		content: 'Os seus dados serão analisados em breve pela Direção da SPG. Após a análise, receberá um email com a confirmação da sua conta. Agradecemos o seu interesse.',
		title: 'Recebemos a sua candidatura à SPG',
	});

	await payload.sendEmail({
		html: htmlData,
		subject: 'Recebemos a sua candidatura à SPG',
		to: userData.email,
	});

	console.log('Signup Confirmation Email sent to:', userData.email);

	//
}
