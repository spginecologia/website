'use client';

/* * */

import type { Guideline } from '@/payload-types';

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { RedirectDisplay } from '@/components/common/RedirectDisplay';
import { Section } from '@/components/common/Section';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function GuidelineDetail({ id }) {
	//

	//
	// A. Fetch data

	const { data: guidelineData } = useSWR<Guideline>(`/api/guidelines/${id}`);

	//
	// B. Transform data

	const guidelineHref = useMemo(() => {
		if (!guidelineData) return;
		if (guidelineData.content_type === 'file' && typeof guidelineData.document === 'object') {
			return guidelineData.document?.url;
		}
		if (guidelineData.content_type === 'url') {
			return guidelineData.url;
		}
	}, [guidelineData]);

	//
	// C. Render components

	return (
		<ContentWrapper>
			<Section topSpacerType="academia">
				<RedirectDisplay href={guidelineHref} />
			</Section>
		</ContentWrapper>
	);

	//
}
