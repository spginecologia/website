/* * */

import payloadConfig from '@/payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET(request: Request, { params }: { params: Promise<{ video_id: string }> }) {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Get the current logged in user

		const currentUser = await payload.auth({ headers: request.headers });
		if (!currentUser.user?.id) return new Response(null, { status: 401 });

		const currentUserData = await payload.findByID({ collection: 'users', id: currentUser.user.id });
		if (!currentUserData) return new Response(null, { status: 404 });

		//
		// Get the video ID from the request query

		const videoId = (await params).video_id;

		if (!videoId || typeof videoId !== 'string') return new Response('Invalid video ID', { status: 400 });

		//
		// Search videos for the current user

		const videoFile = await payload.find({
			collection: 'videos',
			where: {
				id: {
					equals: videoId,
				},
			},
		});

		if (!videoFile.docs.length) {
			return new Response('No video files found matching the provided ID', { status: 404 });
		}

		console.log(`Fetched ${videoFile.docs.length} video files...`);

		return Response.json(videoFile.docs.pop(), { status: 200 });

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
