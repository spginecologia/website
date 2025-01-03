/* * */

import { UserEditableProfileDefault } from '@/schemas/collections/User/default';
import { UserEditableProfileValidation } from '@/schemas/collections/User/validation';
import payloadConfig from '@payload-config';
import { mergekit } from 'mergekit';
import { getPayload } from 'payload';

/* * */

export async function POST(request: Request) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 401 });

		//
		// Get the form data

		const data = await request.json();
		if (!data) return new Response(null, { status: 400 });

		//
		// Validate the form data

		const validationResult = UserEditableProfileValidation.parse(data);

		const mergedData = mergekit([validationResult], { onlyKeys: Object.keys(UserEditableProfileDefault) });

		//
		// Update the user

		const updateResult = await payload.update({
			collection: 'users',
			data: mergedData,
			id: currentUser.user.id,
		});

		return Response.json(updateResult);

		//
	}
	catch (err) {
		console.log(err.message);
		return new Response(`API route error: ${err.message}`, { status: 500 });
	}
}
