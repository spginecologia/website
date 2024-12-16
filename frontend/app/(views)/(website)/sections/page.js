/* * */

import Section from '@/components/FrontendSection/FrontendSection';
import NoDataLabel from '@/components/NoDataLabel/NoDataLabel';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
	return (
		<Section first>
			<NoDataLabel text="Secções" />
			<Space h={300} />
		</Section>
	);
}
