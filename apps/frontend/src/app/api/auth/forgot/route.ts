/* * */

import { type ForgotPasswordResponse } from '@/src/payload/collections/ForgotPassword/types';
import { getAnonymizedEmail } from '@/src/utils/get-anonymized-email';
import { payloadGetUser } from '@/src/utils/payload-get-user';
import { payloadSendResetPasswordEmail } from '@/src/utils/payload-send-reset-password-email';

/* * */

export async function POST(request: Request) {
	try {
		//

		const requestBody = await request.json();

		//
		// If no user is found, send a 200 response.
		// If the user is found but has no email, send a 200 response but with
		// a flag indicating that the user has no email.

		const foundUser = await payloadGetUser(requestBody.username);

		if (!foundUser) {
			const response: ForgotPasswordResponse = { has_email: false, user_found: false };
			return new Response(JSON.stringify(response), { status: 200 });
		}

		if (!foundUser.email) {
			const response: ForgotPasswordResponse = { has_email: false, user_found: true };
			return new Response(JSON.stringify(response), { status: 200 });
		}

		//
		// If the user is found and has an email, we can now request an email with
		// a reset pasword token to be sent to the user using the Payload API.

		await payloadSendResetPasswordEmail(foundUser, requestBody.redirect);

		//
		// Return a 200 response with the user's email, but anonymized.

		const anonymizedEmail = getAnonymizedEmail(foundUser.email);

		const response: ForgotPasswordResponse = { has_email: anonymizedEmail, user_found: true };
		return new Response(JSON.stringify(response), { status: 200 });

		//
	}
	catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
