'use client';

/* * */

import { Card } from '@/components/cards/Card';
import { Section } from '@/components/common/Section';
import { type PayloadAPIResponse } from '@/types/payload-api-response';
import { Button, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { type Guideline } from 'payload-types';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AcademiaHomeGuidelines() {
	//

	//
	// A. Setup variables

	const t = useTranslations('academia.AcademiaHomeGuidelines');

	//
	// B. Fetch data

	const { data: allGuidelinesData } = useSWR<PayloadAPIResponse<Guideline>>(`/api/guidelines?limit=1000&sort=-publishedAt`);

	//
	// C. Transform data

	const featuredItems = useMemo(() => {
		if (!allGuidelinesData) return [];
		return allGuidelinesData.docs
			.sort((a, b) => b.publishedAt?.localeCompare(a.publishedAt))
			.slice(0, 4);
	}, [allGuidelinesData]);

	//
	// C. Render components

	return (
		<Section>
			<Title order={1}>{t('title')}</Title>
			<div className={styles.grid}>
				{featuredItems.map(guidelineData => (
					<Card
						key={guidelineData.id}
						coverAspectRatio="210 / 297"
						coverSrc={typeof guidelineData.featured_image === 'object' ? guidelineData.featured_image?.url : undefined}
						href={`/academia/guidelines/${guidelineData.id}`}
						publishDate={new Date(guidelineData.publishedAt)}
						title={guidelineData.title}
					/>
				))}
			</div>
			<Button component={Link} href="/academia/guidelines" m="auto" mt="xl">
				{t('see_all')}
			</Button>
		</Section>
	);

	//
}
