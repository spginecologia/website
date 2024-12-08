'use client';

/* * */

import type { Publication } from '@/payload-types';

import Card from '@/components/cards/Card';
import { CardSkeleton } from '@/components/cards/CardSkeleton';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function PublicationsList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('publications.PublicationsList');

	//
	// B. Fetch data

	const { data: allPublicationsData, error: allPublicationsError, isLoading: allPublicationsLoading } = useSWR<PayloadAPIResponse<Publication>>(`/api/publications`);

	console.log(allPublicationsData);

	//
	// C. Render components

	if (allPublicationsLoading) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <CardSkeleton key={i} coverAspectRatio="210 / 297" />)}
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (allPublicationsError) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (!allPublicationsData?.docs.length) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<NoDataDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	return (
		<FrontendWrapperInner>
			<FrontendSection first>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{allPublicationsData?.docs.map(guideline => (
						<Card
							key={guideline.id}
							coverAspectRatio="210 / 297"
							coverSrc={typeof guideline.featured_image === 'object' ? guideline?.featured_image?.url : undefined}
							href={`/academia/publications/${guideline.id}`}
							publishDate={new Date(guideline.createdAt)}
							title={guideline.title}
						/>
					))}
				</div>
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
