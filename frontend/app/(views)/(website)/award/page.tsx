/* * */

import { Section } from '@/components/common/Section';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
	return (
		<Section topSpacerType='transparent'>
			<NoDataLabel text="Prémio SPG" />
			<Space h={300} />
		</Section>
	);
}
