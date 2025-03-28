'use client';

/* * */

import { Card } from '@/components/cards/Card';
import { CardSkeleton } from '@/components/cards/CardSkeleton';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { Section } from '@/components/common/Section';
import { type Guideline } from '@/payload-types';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function GuidelinesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('guidelines.GuidelinesList');

	//
	// B. Fetch data

	const { data: allGuidelinesData, error: allGuidelinesError, isLoading: allGuidelinesLoading } = useSWR<PayloadAPIResponse<Guideline>>(`/api/guidelines`);

	//
	// C. Render components

	if (allGuidelinesLoading) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <CardSkeleton key={i} coverAspectRatio="210 / 297" />)}
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	if (allGuidelinesError) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	if (!allGuidelinesData?.docs.length) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<NoDataDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper>
			<Section withTopSpacer="academia">
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{allGuidelinesData?.docs.map(guidelineData => (
						<Card
							key={guidelineData.id}
							coverAspectRatio="210 / 297"
							coverSrc={typeof guidelineData.featured_image === 'object' ? guidelineData.featured_image?.url : undefined}
							href={`/academia/guidelines/${guidelineData.id}`}
							publishDate={new Date(guidelineData.createdAt)}
							title={guidelineData.title}
						/>
					))}
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
