/* * */

import { NewsDetail } from '@/components/news/NewsDetail';

/* * */

export default async function Page({ params }) {
	const { news_id } = await params;
	return <NewsDetail id={news_id} />;
}
