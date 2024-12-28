/* * */

import { Loader } from '@/components/common/Loader';
import { Section } from '@/components/common/Section';

/* * */

export default function Loading() {
	return (
		<Section topSpacerType="transparent">
			<Loader full visible />
		</Section>
	);
}
