'use client';

/* * */

import { AuthWall } from '@/components/auth/AuthWall';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { RedirectDisplay } from '@/components/common/RedirectDisplay';
import { Section } from '@/components/common/Section';
import { type Publication } from 'payload-types';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function PublicationDetail({ id }) {
	//

	//
	// A. Fetch data

	const { data: publicationData } = useSWR<Publication>(`/api/publications/${id}`);

	//
	// B. Transform data

	const publicationHref = useMemo(() => {
		if (!publicationData) return;
		if (publicationData.content_type === 'file' && typeof publicationData.document === 'object') {
			return publicationData.document?.url;
		}
		if (publicationData.content_type === 'url') {
			return publicationData.url;
		}
	}, [publicationData]);

	//
	// C. Render components

	return (
		<ContentWrapper>
			<Section withTopSpacer="transparent">
				<AuthWall>
					<RedirectDisplay href={publicationHref} />
				</AuthWall>
			</Section>
		</ContentWrapper>
	);

	//
}
