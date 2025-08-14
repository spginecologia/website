/* * */

import { VideoDetail } from '@/components/videos/VideoDetail';

/* * */

export default async function Page({ params }) {
	const { id } = await params;
	return <VideoDetail id={id} />;
}
