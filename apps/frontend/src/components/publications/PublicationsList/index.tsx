'use client';

/* * */

import type { Publication } from '@/payload-types';

import { Card } from '@/components/cards/Card';
import { CardSkeleton } from '@/components/cards/CardSkeleton';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { Section } from '@/components/common/Section';
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

	//
	// C. Render components

	if (allPublicationsLoading) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <CardSkeleton coverAspectRatio="210 / 297" key={i} />)}
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	if (allPublicationsError) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	if (!allPublicationsData?.docs.length) {
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
			</Section>
		</ContentWrapper>
	);

	//
}
