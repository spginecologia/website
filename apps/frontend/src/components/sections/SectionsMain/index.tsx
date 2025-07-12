/* * */

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { SectionsIntro } from '@/src/components/sections/SectionsIntro';
import { SectionsSelector } from '@/src/components/sections/SectionsSelector';

/* * */

export function SectionsMain() {
	return (
		<ContentWrapper withGap={false}>
			<SectionsSelector withTopSpacer />
			<SectionsIntro />
		</ContentWrapper>
	);
}
