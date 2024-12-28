/* * */

import { Footer } from '@/components/footer/Footer';
import { GuidelineDetail } from '@/components/guidelines/GuidelineDetail';

/* * */

export default async function Page({ params }) {
	const { guideline_id } = await params;
	return (
		<>
			<GuidelineDetail id={guideline_id} />
			<Footer />
		</>
	);
}
