import ConsensoList from '@/components/consensos/ConsensosList';
import { Section } from '@/components/layout/Section';
import config from '@/payload.config';
import { getPayload } from 'payload';

export default async function HomeConsensosSection() {
	const payload = await getPayload({ config });
	const consensos = await payload.find({
		collection: 'consensos',
		limit: 4,
		sort: 'createdAt',
	});

	return (
		<Section heading="Consensos">
			<ConsensoList consensos={consensos.docs} />
		</Section>
	);
}
