/* * */

import { UserValidation } from '@/schemas/User/validation';
import config from '@payload-config';
import { getPayload } from 'payload';

/* * */

const payload = await getPayload({ config });

/* * */

export async function POST(request: Request) {
	try {
		//

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 400 });

		//
		// Get the form data

		const data = await request.json();
		if (!data) return new Response(null, { status: 400 });

		//
		// Validate the form data

		const validationResult = UserValidation.parse(data);

		//
		// Update the user

		const updateResult = await payload.update({
			collection: 'users',
			data: validationResult,
			id: currentUser.user.id,
		});

		return Response.json(updateResult);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
