import NewsSection from '@/components/news/NewsList';
import config from '@/payload.config';
import { getPayload } from 'payload';

export default async function HomeNewsSection() {
	const payload = await getPayload({ config });
	const newsList = await payload.find({
		collection: 'noticias',
		limit: 3,
		pagination: true,
		sort: '-createdAt',
	});

	return <NewsSection news={newsList.docs} />;
}
