/* * */

import payloadConfig from '@/payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET() {
	try {
		//

		const payload = await getPayload({ config: payloadConfig });

		//
		// Search videos for the current user

		const videoFiles = await payload.find({
			collection: 'videos',
			limit: 1000,
			sort: '-publishedAt',
			where: {
				status: {
					equals: 'approved',
				},
			},
		});

		console.log(`Fetched ${videoFiles.docs.length} video files...`);

		return Response.json(videoFiles);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
