/* * */

import payloadConfig from '@/payload-config';
import { getPayload } from 'payload';

/* * */

export async function GET(_: Request, { params }: { params: Promise<{ section_slug: string }> }) {
	try {
		//

		//
		// Get the invoice ID from the request query

		const sectionSlug = (await params).section_slug;

		if (!sectionSlug || typeof sectionSlug !== 'string') return new Response(null, { status: 400 });

		//
		// Search videos for the current user

		const payload = await getPayload({ config: payloadConfig });

		const foundSections = await payload.find({
			collection: 'sections',
			where: {
				slug: {
					equals: sectionSlug,
				},
			},
		});

		if (!foundSections || foundSections.docs.length === 0) {
			return new Response(null, { status: 404 });
		}

		return Response.json(foundSections.docs[0]);

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
