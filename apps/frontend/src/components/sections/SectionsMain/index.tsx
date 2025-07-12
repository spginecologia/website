/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { SectionsIntro } from '@/components/sections/SectionsIntro';
import { SectionsSelector } from '@/components/sections/SectionsSelector';

/* * */

export function SectionsMain() {
	return (
		<ContentWrapper withGap={false}>
			<SectionsSelector withTopSpacer />
			<SectionsIntro />
		</ContentWrapper>
	);
}
