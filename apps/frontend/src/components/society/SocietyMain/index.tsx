/* * */

import { SocietyLegalDocuments } from '@/src/components/society/SocietyLegalDocuments';
import { SocietyMission } from '@/src/components/society/SocietyMission';
import { SocietySocialBodies } from '@/src/components/society/SocietySocialBodies';

/* * */

export function SocietyMain() {
	return (
		<>
			<SocietyMission withTopSpacer />
			<SocietySocialBodies />
			<SocietyLegalDocuments	/>
		</>
	);
}
