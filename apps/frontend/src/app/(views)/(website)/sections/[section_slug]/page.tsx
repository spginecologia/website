/* * */

import { SectionDetail } from '@/src/components/sections/SectionDetail';

/* * */

export default async function Page({ params }) {
	const { section_slug } = await params;
	return <SectionDetail slug={section_slug} />;
}
