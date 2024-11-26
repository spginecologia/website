import EventsList from '@/components/eventos/EventList';
import { Section } from '@/components/layout/Section';
import config from '@/payload.config';
import { getPayload } from 'payload';

export default async function HomeEventSection() {
	const payload = await getPayload({ config });
	const eventsList = await payload.find({
		collection: 'events',
		limit: 2,
		sort: 'start_date',
	});

	return (
		<Section heading="Agenda">
			<EventsList events={eventsList.docs} />
		</Section>
	);
}
