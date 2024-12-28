'use client';

/* * */

import type { News } from '@/payload-types';

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { Section } from '@/components/common/Section';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsCardFeatured } from '@/components/news/NewsCardFeatured';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function NewsList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('news.NewsList');

	//
	// B. Fetch data

	const { data: allNewsData, error: allNewsError, isLoading: allNewsLoading } = useSWR<PayloadAPIResponse<News>>(`/api/news`);

	//
	// C. Transform data

	const featuredNewsItem = useMemo(() => {
		if (!allNewsData) return null;
		return allNewsData.docs
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
			.filter(news => news.is_featured)
			.pop();
	}, [allNewsData]);

	const regularNewsItems = useMemo(() => {
		if (!allNewsData) return [];
		return allNewsData.docs
			.filter(news => news.id !== featuredNewsItem?.id)
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}, [allNewsData, featuredNewsItem]);

	//
	// D. Render components

	if (allNewsLoading) {
		return (
			<ContentWrapper>
				<Section topSpacerType="transparent">
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <NewsCard key={i} />)}
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	if (allNewsError) {
		return (
			<ContentWrapper>
				<Section topSpacerType="transparent">
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	if (!allNewsData?.docs.length) {
		return (
			<ContentWrapper>
				<Section topSpacerType="transparent">
					<Title order={1}>{t('title')}</Title>
					<NoDataDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper>
			<Section topSpacerType="transparent">
				{featuredNewsItem && (
					<NewsCardFeatured
						coverSrc={typeof featuredNewsItem.featured_image === 'object' ? featuredNewsItem?.featured_image?.url : undefined}
						href={`/news/${featuredNewsItem.id}`}
						publishDate={new Date(featuredNewsItem.createdAt)}
						summary={featuredNewsItem.summary}
						title={featuredNewsItem.title}
						topic={featuredNewsItem.topics && typeof featuredNewsItem.topics[0] === 'object' ? featuredNewsItem.topics[0] : undefined}
					/>
				)}
			</Section>
			<Section>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{regularNewsItems.map(news => (
						<NewsCard
							key={news.id}
							coverSrc={typeof news.featured_image === 'object' ? news?.featured_image?.url : undefined}
							href={`/news/${news.id}`}
							publishDate={new Date(news.createdAt)}
							summary={news.summary}
							title={news.title}
							topic={news.topics && typeof news.topics[0] === 'object' ? news.topics[0] : undefined}
						/>
					))}
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
