/* * */

import payloadConfig from '@payload-config';
import { DateTime } from 'luxon';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Extract the password and password confirmation fields from the request body

		const requestBody = await request.json();

		const newPassword = requestBody.password;
		const newPasswordConfirmation = requestBody.password_confirmation;

		const resetToken = requestBody.token;
		if (!resetToken) throw new Error('Token not provided.');

		console.log('Token:', resetToken);

		//
		// Check if the password and password confirmation fields match
		// and if the password is at least 5 characters long.

		if (newPassword !== newPasswordConfirmation) {
			throw new Error('Passwords do not match.');
		}

		if (newPassword.length < 5) {
			throw new Error('Password must be at least 5 characters long.');
		}

		//
		// Now, using the found user object, we can request an email with
		// a reset pasword token to be sent to the user using the
		// Payload API forgot password method.

		const resetResult = await payload.resetPassword({
			collection: 'users',
			data: {
				password: newPassword,
				token: resetToken,
			},
			overrideAccess: true,
			req: request,
		});

		//
		// Now, using the found user object, we can login the user using the
		// Payload API login method. This method will return the user object
		// with the user's data and the auth token. Pass the request object
		// to the login method to automatically set the auth cookie.

		const loginResult = await payload.login({
			collection: 'users',
			data: {
				email: resetResult.user.email as string,
				password: newPassword,
			},
			req: request,
		});

		//
		// Ensure we have a valid login result and build the response object.
		// Set the auth token as a cookie in the response object.

		if (!loginResult || !loginResult.token || !loginResult.exp) {
			throw new Error('Login failed due to missing token or expiry.');
		}

		return new Response(JSON.stringify(loginResult), {
			headers: {
				'Set-Cookie': `payload-token=${loginResult.token};Expires=${DateTime.fromSeconds(loginResult.exp).toHTTP()};Domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN};Path=/;Secure=true;HttpOnly=true;SameSite=Strict`,
			},
			status: 200,
		});

		//
	}
	catch (err) {
		console.error(err);
		return new Response(err.message, { status: 401 });
	}
}
