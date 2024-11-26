import NewsBanner from '@/components/news/NewsBanner';
import NewsList from '@/components/news/NewsList';
import config from '@/payload.config';
import { getPayload } from 'payload';

export default async function Component() {
	const payload = await getPayload({ config });
	const newsList = await payload.find({
		collection: 'noticias',
		limit: 1000,
		pagination: true,
	});

	return (
		<>
			<NewsBanner />
			<NewsList news={newsList.docs} />
		</>
	);
}
