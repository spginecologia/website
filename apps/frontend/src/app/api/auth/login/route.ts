/* * */

import payloadConfig from '@/services/payload-config';
import { User } from 'payload-types';
import { validateTaxId } from '@/utils/validate-tax-id';
import { DateTime } from 'luxon';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Extract the username (email or NIF) and password from the request body

		const requestBody = await request.json();

		const emailOrTaxId = requestBody.username;
		const password = requestBody.password;

		//
		// Check if the user is trying to login with Tax ID instead of email.
		// If the user is trying to login with Tax ID, we need to find
		// the email associated with that Tax ID first.

		const isTaxId = validateTaxId(emailOrTaxId, false, ['singular']);

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
		// Now, using the found user object, we can login the user using the
		// Payload API login method. This method will return the user object
		// with the user's data and the auth token. Pass the request object
		// to the login method to automatically set the auth cookie.

		const loginResult = await payload.login({
			collection: 'users',
			data: {
				email: foundUser.email,
				password: password,
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
