/* * */

import { VideoDetail } from '@/src/components/videos/VideoDetail';

/* * */

export default async function Page({ params }) {
	const { video_id } = await params;
	return <VideoDetail id={video_id} />;
}
