/* * */

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET() {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Search videos for the current user

		const publishedVideos = await payload.find({
			collection: 'videos',
			populate: {
				'topics': {
					title: true,
				},
				'video-files': {
					duration: true,
					url: true,
				},
			},
			where: {
				status: {
					equals: 'approved',
				},
			},
		});

		return Response.json(publishedVideos);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
