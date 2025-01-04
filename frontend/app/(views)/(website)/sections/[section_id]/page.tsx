/* * */

import { SectionDetail } from '@/components/sections/SectionDetail';

/* * */

export default async function Page({ params }) {
	const { section_id } = await params;
	return <SectionDetail id={section_id} />;
}
