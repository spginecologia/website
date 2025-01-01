/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { SocietyMission } from '@/components/society/SocietyMission';
import { SocietySocialBodies } from '@/components/society/SocietySocialBodies';

/* * */

export function SocietyMain() {
	return (
		<ContentWrapper withGap={false}>
			<SocietyMission withTopSpacer />
			<SocietySocialBodies />
		</ContentWrapper>
	);
}
