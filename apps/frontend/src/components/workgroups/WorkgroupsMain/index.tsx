/* * */

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { SectionsSelector } from '@/src/components/sections/SectionsSelector';
import { WorkgroupsIntro } from '@/src/components/workgroups/WorkgroupsIntro';

/* * */

export function WorkgroupsMain() {
	return (
		<ContentWrapper withGap={false}>
			<SectionsSelector withTopSpacer />
			<WorkgroupsIntro />
		</ContentWrapper>
	);
}
