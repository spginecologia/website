'use client';

/* * */

import { Card } from '@/components/cards/Card';
import { CardSkeleton } from '@/components/cards/CardSkeleton';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { Section } from '@/components/common/Section';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { type Guideline } from 'payload-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function HomeGuidelines() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: allGuidelinesData, error: allGuidelinesError, isLoading: allGuidelinesLoading } = useSWR<PayloadAPIResponse<Guideline>>(`/api/guidelines?limit=4&sort=-publishedAt`);

	//
	// C. Transform data

	const sortedGuidelinesData = useMemo(() => {
		if (!allGuidelinesData) return [];
		return allGuidelinesData.docs
			.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
			.slice(0, 4);
	}, [allGuidelinesData]);

	//
	// D. Render components

	if (allGuidelinesLoading) {
		return (
			<Section>
				<Title order={1}>{t('home.HomeGuidelines.title')}</Title>
				<div className={styles.grid}>
					{[...Array(4)].map((_, i) => <CardSkeleton key={i} coverAspectRatio="210 / 297" />)}
				</div>
			</Section>
		);
	}

	if (allGuidelinesError) {
		return (
			<Section>
				<Title order={1}>{t('home.HomeGuidelines.title')}</Title>
				<ErrorDisplay />
			</Section>
		);
	}

	if (!sortedGuidelinesData.length) {
		return (
			<Section>
				<Title order={1}>{t('home.HomeGuidelines.title')}</Title>
				<NoDataDisplay />
			</Section>
		);
	}

	return (
		<Section>
			<Title order={1}>{t('home.HomeGuidelines.title')}</Title>
			<div className={styles.grid}>
				{sortedGuidelinesData.map(guidelineData => (
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
	);

	//
}
