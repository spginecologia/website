/* * */

import { Section } from '@/components/common/Section';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
	return (
		<Section withTopSpacer="academia">
			<NoDataLabel text="Bolsa de Investigação" />
			<Space h={300} />
		</Section>
	);
}
