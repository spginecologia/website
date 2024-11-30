/* * */

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

		console.log(request.body);

		return Response.json({});

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
