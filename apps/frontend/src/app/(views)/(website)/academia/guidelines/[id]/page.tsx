/* * */

import { GuidelineDetail } from '@/components/guidelines/GuidelineDetail';

/* * */

export default async function Page({ params }) {
	const { id } = await params;
	return <GuidelineDetail id={id} />;
}
