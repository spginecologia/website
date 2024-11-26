/* * */

import PageComponent from '@/components/courses/Slug';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

export default async function Page({ params }: { params: { slug: string } }) {
	const payload = await getPayload({ config });
	const query = await payload.find({
		collection: 'courses',
		where: {
			slug: {
				equals: params.slug,
			},
		},
	});

	if (!query.docs.length) {
		notFound();
	}

	return <PageComponent course={query.docs[0]} />;
}
