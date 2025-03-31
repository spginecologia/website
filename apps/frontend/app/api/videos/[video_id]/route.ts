/* * */

import payloadConfig from '@payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET(_: Request, { params }: { params: Promise<{ video_id: string }> }) {
	try {
		//

		const videoId = (await params).video_id;

		if (!videoId || typeof videoId !== 'string') return new Response(null, { status: 400 });

		//
		// Search videos for the current user

		const payload = await getPayload({ config: payloadConfig });

		const publishedVideos = await payload.findByID({
			collection: 'videos',
			id: videoId,
			// populate: {
			// 	'topics': {
			// 		title: true,
			// 	},
			// 	'video-files': {
			// 		duration: true,
			// 		url: true,
			// 	},
			// },
		});

		return Response.json(publishedVideos);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
