/* * */

import payloadConfig from '@/payload-config';
import { validateTaxId } from '@/services/general/validate-tax-id';
import { DateTime } from 'luxon';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Parse the request body to get the username and password.

		const requestBody = await request.json();

		//
		// Check if the provided username (Tax ID) is valid.
		// If it is not, throw an error. We expect the username
		// to be a valid Tax ID for singular persons.

		const isValidTaxId = validateTaxId(requestBody.username, false, ['singular']);

		if (!isValidTaxId) {
			throw new Error(`Invalid Tax ID format: ${requestBody.username}. Expected a valid Tax ID for singular persons.`);
		}

		//
		// Find the associated email for the given Tax ID.
		// We will use this email to login the user, as Payload's
		// login method requires an email and password. If no user
		// is found for the given Tax ID, throw an error.

		const result = await payload.find({
			collection: 'users',
			where: { tax_id: { equals: requestBody.username } },
		});

		if (result.docs.length === 0) {
			throw new Error(`User not found for given Tax ID: ${requestBody.username}`);
		}

		const foundUser = result.docs[0];

		//
		// Now, using the found user object, we can login the user using the
		// Payload API login method. This method will return the user object
		// with the user's data and the auth token. Pass the request object
		// to the login method to automatically set the auth cookie.

		const loginResult = await payload.login({
			collection: 'users',
			data: {
				email: foundUser.email,
				password: requestBody.password,
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
