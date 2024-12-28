/* * */

import { Footer } from '@/components/footer/Footer';
import { VideoDetail } from '@/components/videos/VideoDetail';

/* * */

export default async function Page({ params }) {
	const { video_id } = await params;
	return (
		<>
			<VideoDetail id={video_id} />
			<Footer />
		</>
	);
}
