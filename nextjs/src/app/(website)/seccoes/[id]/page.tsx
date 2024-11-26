/* * */

import PageComponent from '@/components/seccoes/Slug';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

export default async function Page({ params }: { params: { id: string } }) {
	const payload = await getPayload({ config });
	const query = await payload.find({
		collection: 'sections',
		depth: 1,
		where: {
			slug: {
				equals: params.id,
			},
		},
	});

	if (!query.docs.length) {
		notFound();
	}

	return <PageComponent section={query.docs[0]} />;
}
