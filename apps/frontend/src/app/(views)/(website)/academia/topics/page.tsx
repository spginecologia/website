/* * */

import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { Section } from '@/components/common/Section';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
	return (
		<Section withTopSpacer="transparent">
			<NoDataDisplay text="Pesquisa por Tópicos" />
			<Space h={300} />
		</Section>
	);
}
