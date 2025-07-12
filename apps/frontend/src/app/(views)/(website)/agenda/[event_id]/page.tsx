/* * */

import { EventDetail } from '@/src/components/events/EventDetail';

/* * */

export default async function Page({ params }) {
	const { event_id } = await params;
	return <EventDetail id={event_id} />;
}
