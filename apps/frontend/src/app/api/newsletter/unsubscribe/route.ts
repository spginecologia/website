/* * */

import payloadConfig from '@/payload-config';
import { BREVOAPI } from '@/services/brevo/BREVOAPI';
import { cloudflareVerifyTurnstileToken } from '@/services/cloudflare/cloudflare-verify-turnstile-token';
import { validateEmail } from '@/services/general/validate-email';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		//
		// Extract the request body from the request

		const requestBody = await request.json();

		console.log('webhook', requestBody);

		// //
		// // Verify the Turnstile token to prevent spam

		// const isValid = await cloudflareVerifyTurnstileToken(requestBody.turnstile_token);

		// if (!isValid) {
		// 	return new Response('Invalid Cloudflare Turnstile token.', { status: 400 });
		// }

		// //
		// // Validate the request body to check for missing or invalid fields

		// const isValidEmail = validateEmail(requestBody.email, false);

		// if (!isValidEmail) {
		// 	return new Response('Invalid email address.', { status: 400 });
		// }

		// //
		// // Check if the requested email address belongs to a website user.
		// // If the email address is not found, then simply add the email address
		// // to the newsletter list and return a success response. However,
		// // if the email address is found, then update the user's preference
		// // to receive the newsletter and subscribe it in Brevo.

		// const payload = await getPayload({ config: payloadConfig });

		// const findResult = await payload.find({
		// 	collection: 'users',
		// 	where: { email: { equals: requestBody.email } },
		// });

		// if (findResult.docs.length === 0) {
		// 	await BREVOAPI({
		// 		data: JSON.stringify({
		// 			attributes: { FIRSTNAME: requestBody.name },
		// 			email: requestBody.email,
		// 			emailBlacklisted: false,
		// 			updateEnabled: true,
		// 		}),
		// 		method: 'POST',
		// 		service: 'contacts',
		// 	});
		// 	return new Response('Email is now subscribed to the newsletter.', { status: 200 });
		// }

		// //
		// // Update Payload with the user's preference to receive the newsletter.
		// // This will trigger a hook that will also update the user's subscription in Brevo.

		// const foundUser = findResult.docs[0];

		// await payload.update({
		// 	collection: 'users',
		// 	data: {
		// 		send_newsletter: true,
		// 	},
		// 	id: foundUser.id,
		// });

		return new Response('Email is now subscribed to the newsletter.', { status: 200 });

		//
	}
	catch (err) {
		console.log(err);
		return new Response(`An error occurred: ${err.message}`, { status: 500 });
	}
}
