/* * */

import { Section } from '@/src/components/common/Section';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
	return (
		<Section withTopSpacer="transparent">
			<NoDataLabel text="Pesquisa por Tópicos" />
			<Space h={300} />
		</Section>
	);
}
