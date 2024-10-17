/* * */

import { Section } from '@/payload-types';
import SectionAbout from '../SectionAbout';
import SectionLinks from '../SectionLinks';

/* * */

export default function Component({section}: {section: Section}) {
	return (
		<>
			<SectionAbout section={section} />
			<SectionLinks section={section} />
		</>
	);
}
