'use client';

/* * */

import type { Event } from '@/payload-types';

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { EventsCard } from '@/components/news/EventsCard';
import { EventsCardFeatured } from '@/components/news/EventsCardFeatured';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function EventsList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('events.EventsList');

	//
	// B. Fetch data

	const { data: allEventsData, error: allEventsError, isLoading: allEventsLoading } = useSWR<PayloadAPIResponse<Events>>(`/api/news`);

	//
	// C. Transform data

	const featuredEventsItem = useMemo(() => {
		if (!allEventsData) return null;
		return allEventsData.docs
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
			.filter(news => news.is_featured)
			.pop();
	}, [allEventsData]);

	const regularEventsItems = useMemo(() => {
		if (!allEventsData) return [];
		return allEventsData.docs
			.filter(news => news.id !== featuredEventsItem?.id)
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}, [allEventsData, featuredEventsItem]);

	//
	// D. Render components

	if (allEventsLoading) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <EventsCard key={i} />)}
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (allEventsError) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (!allEventsData?.docs.length) {
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
				{featuredEventsItem && (
					<EventsCardFeatured
						coverSrc={typeof featuredEventsItem.featured_image === 'object' ? featuredEventsItem?.featured_image?.url : undefined}
						href={`/news/${featuredEventsItem.id}`}
						publishDate={new Date(featuredEventsItem.createdAt)}
						summary={featuredEventsItem.summary}
						title={featuredEventsItem.title}
						topic={featuredEventsItem.topics && typeof featuredEventsItem.topics[0] === 'object' ? featuredEventsItem.topics[0] : undefined}
					/>
				)}
			</FrontendSection>
			<FrontendSection>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{regularEventsItems.map(news => (
						<EventsCard
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
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
