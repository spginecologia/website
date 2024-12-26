/* * */

import { Loader } from '@/components/common/Loader';
import Section from '@/components/FrontendSection/FrontendSection';

/* * */

export default function Loading() {
	return (
		<Section first>
			<Loader full visible />
		</Section>
	);
}
