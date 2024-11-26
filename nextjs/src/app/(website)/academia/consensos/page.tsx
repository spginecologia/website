/* * */

import ConsensoList from '@/components/consensos/ConsensosList';
import { Section } from '@/components/layout/Section';
import config from '@/payload.config';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';

export default async function Page() {
	const payload = await getPayload({ config });
	const query = await payload.find({
		collection: 'consensos',
		limit: 100,
		sort: 'createdAt',
	});

	if (!query.docs.length) {
		notFound();
	}

	return (
		<>
			<Section heading="Consensos">
				<ConsensoList consensos={query.docs} />
			</Section>
		</>
	);
}
