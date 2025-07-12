'use client';

/* * */

import type { News } from '@/payload-types';

import { ErrorDisplay } from '@/src/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/src/components/common/NoDataDisplay';
import { Section } from '@/src/components/common/Section';
import { NewsCard } from '@/src/components/news/NewsCard';
import { PayloadAPIResponse } from '@/src/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function HomeNews() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.HomeNews');

	//
	// B. Fetch data

	const { data: allNewsData, error: allNewsError, isLoading: allNewsLoading } = useSWR<PayloadAPIResponse<News>>(`/api/news`);

	//
	// C. Transform data

	const sortedNewsData = useMemo(() => {
		if (!allNewsData) return [];
		return allNewsData.docs
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
			.slice(0, 3);
	}, [allNewsData]);

	//
	// D. Render components

	if (allNewsLoading) {
		return (
			<Section>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{[...Array(3)].map((_, i) => <NewsCard key={i} />)}
				</div>
			</Section>
		);
	}

	if (allNewsError) {
		return (
			<Section>
				<Title order={1}>{t('title')}</Title>
				<ErrorDisplay />
			</Section>
		);
	}

	if (!sortedNewsData.length) {
		return (
			<Section>
				<Title order={1}>{t('title')}</Title>
				<NoDataDisplay />
			</Section>
		);
	}

	return (
		<Section>
			<Title order={1}>{t('title')}</Title>
			<div className={styles.grid}>
				{sortedNewsData.map(newsData => (
					<NewsCard
						key={newsData.id}
						coverSrc={typeof newsData.featured_image === 'object' ? newsData.featured_image?.url : undefined}
						href={`/news/${newsData.id}`}
						publishDate={new Date(newsData.publishedAt)}
						summary={newsData.summary}
						title={newsData.title}
						topic={newsData.topics && typeof newsData.topics[0] === 'object' ? newsData.topics[0] : undefined}
					/>
				))}
			</div>
		</Section>
	);

	//
}
