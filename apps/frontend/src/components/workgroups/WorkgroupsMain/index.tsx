/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { SectionsSelector } from '@/components/sections/SectionsSelector';
import { WorkgroupsIntro } from '@/components/workgroups/WorkgroupsIntro';

/* * */

export function WorkgroupsMain() {
	return (
		<ContentWrapper withGap={false}>
			<SectionsSelector withTopSpacer />
			<WorkgroupsIntro />
		</ContentWrapper>
	);
}
