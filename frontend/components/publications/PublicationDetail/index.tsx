'use client';

/* * */

import type { Guideline } from '@/payload-types';

import { RedirectDisplay } from '@/components/common/RedirectDisplay';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
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
		<FrontendWrapperInner>
			<FrontendSection first>
				<RedirectDisplay href={guidelineHref} />
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
