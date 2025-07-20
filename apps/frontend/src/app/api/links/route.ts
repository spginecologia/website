/* * */

import payloadConfig from '@/services/payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET() {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Search videos for the current user

		const activeLinks = await payload.find({
			collection: 'links',
			where: {
				is_active: {
					equals: true,
				},
			},
		});

		return Response.json(activeLinks);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
