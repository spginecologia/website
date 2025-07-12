/* * */

import { WorkgroupDetail } from '@/src/components/workgroups/WorkgroupDetail';

/* * */

export default async function Page({ params }) {
	const { section_slug } = await params;
	return <WorkgroupDetail slug={section_slug} />;
}
