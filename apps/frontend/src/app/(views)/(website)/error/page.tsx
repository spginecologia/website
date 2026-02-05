'use client';

/* * */

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { Section } from '@/components/common/Section';
import { Space } from '@mantine/core';

/* * */

export default function Page() {
	return (
		<Section withTopSpacer="transparent">
			<Space h={100} />
			<ErrorDisplay />
			<Space h={200} />
		</Section>
	);
}
