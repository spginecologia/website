/* * */

import { type User } from '@/payload-types';
import { getNotificationActionTemplate } from '@/payload/email/notification-action.template';
import { navigationGetUrlWithRedirectParam } from '@/utils/navigation-handle-redirect-param';
import { validateTaxId } from '@/utils/validate-tax-id';
import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Extract the username (email or NIF) and redirect param from the request body

		const requestBody = await request.json();

		const emailOrTaxId = requestBody.username;
		const redirectParam = requestBody.redirect;

		//
		// Check if the user is trying to login with Tax ID instead of email.
		// If the user is trying to login with Tax ID, we need to find
		// the email associated with that Tax ID first.

		const isTaxId = validateTaxId(emailOrTaxId, false);

		let foundUser: User;

		if (isTaxId) {
			const result = await payload.find({
				collection: 'users',
				where: { tax_id: { equals: emailOrTaxId } },
			});
			if (result.docs.length === 0) {
				throw new Error(`User not found for given Tax ID: ${emailOrTaxId}`);
			}
			foundUser = result.docs[0];
		}
		else {
			const result = await payload.find({
				collection: 'users',
				where: { email: { equals: emailOrTaxId } },
			});
			if (result.docs.length === 0) {
				throw new Error(`User not found for given email: ${emailOrTaxId}`);
			}
			foundUser = result.docs[0];
		}

		//
		// Now, using the found user object, we can request an email with
		// a reset pasword token to be sent to the user using the
		// Payload API forgot password method.

		const tokenresult = await payload.forgotPassword({
			collection: 'users',
			data: {
				email: foundUser.email,
			},
			disableEmail: true, // Do Not send the email
			req: request,
		});

		//
		// Send an email to the user with the reset password token.

		const actionUrl = navigationGetUrlWithRedirectParam(`${process.env.NEXT_PUBLIC_URL}/reset?token=${tokenresult}`, redirectParam);

		await payload.sendEmail({
			html: getNotificationActionTemplate({
				action_title: 'Definir Nova Password',
				action_url: actionUrl,
				content: 'Clique no botão abaixo para redefinir a sua password.',
				title: 'Escolha uma nova Password',
			}),
			subject: 'Recuperação de Password SPG',
			to: foundUser.email,
		});

		//
		// Ensure we have a valid login result and build the response object.
		// Set the auth token as a cookie in the response object.

		if (!tokenresult) {
			throw new Error('Reset password failed due to missing token.');
		}

		return new Response(JSON.stringify({ status: 'success' }), { status: 200 });

		//
	}
	catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
