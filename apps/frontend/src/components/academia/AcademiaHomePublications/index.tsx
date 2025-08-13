'use client';

/* * */

import { Card } from '@/components/cards/Card';
import { Section } from '@/components/common/Section';
import { type PayloadAPIResponse } from '@/types/payload-api-response';
import { Button, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { type Publication } from 'payload-types';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AcademiaHomePublications() {
	//

	//
	// A. Setup variables

	const t = useTranslations('academia.AcademiaHomePublications');

	//
	// B. Fetch data

	const { data: allPublicationsData } = useSWR<PayloadAPIResponse<Publication>>(`/api/publications`);

	//
	// C. Transform data

	const featuredItems = useMemo(() => {
		if (!allPublicationsData) return [];
		return allPublicationsData.docs
			.sort((a, b) => b.publishedAt?.localeCompare(a.publishedAt))
			.slice(0, 4);
	}, [allPublicationsData]);

	//
	// D. Render components

	if (!featuredItems.length) {
		return null;
	}

	return (
		<Section>
			<Title order={1}>{t('title')}</Title>
			<div className={styles.grid}>
				{featuredItems.map(guideline => (
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
			<Button component={Link} href="/academia/publications" m="auto" mt="xl">
				{t('see_all')}
			</Button>
		</Section>
	);

	//
}
