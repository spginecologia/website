/* * */

import config from '@payload-config';
import { getPayload } from 'payload';

/* * */

const payload = await getPayload({ config });

/* * */

export async function GET(request: Request) {
	try {
		//

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser || !currentUser.user) return new Response(null, { status: 400 });

		//
		// Search videos for the current user

		const videosForUser = await payload.find({
			collection: 'videos',
			where: {
				publisher: {
					equals: currentUser.user.id,
				},
			},
		});

		return Response.json(videosForUser);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
