/* * */

import { SocietyLegalDocuments } from '@/components/society/SocietyLegalDocuments';
import { SocietyMission } from '@/components/society/SocietyMission';
import { SocietySocialBodies } from '@/components/society/SocietySocialBodies';

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
