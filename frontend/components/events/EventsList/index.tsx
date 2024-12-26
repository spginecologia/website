'use client';

/* * */

import type { Event } from '@/payload-types';

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { EventCard } from '@/components/events/EventCard';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
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

	const { data: allEventsData, error: allEventsError, isLoading: allEventsLoading } = useSWR<PayloadAPIResponse<Event>>(`/api/events`);

	//
	// C. Transform data

	const featuredEventsItem = useMemo(() => {
		if (!allEventsData) return null;
		return allEventsData.docs
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
			.filter(event => event.is_featured)
			.pop();
	}, [allEventsData]);

	const regularEventsItems = useMemo(() => {
		if (!allEventsData) return [];
		return allEventsData.docs
			.filter(event => event.id !== featuredEventsItem?.id)
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
						{[...Array(10)].map((_, i) => <EventCard key={i} />)}
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
			{/* <FrontendSection first>
				{featuredEventsItem && (
					<EventsCardFeatured
						coverSrc={typeof featuredEventsItem.featured_image === 'object' ? featuredEventsItem?.featured_image?.url : undefined}
						href={`/event/${featuredEventsItem.id}`}
						publishDate={new Date(featuredEventsItem.createdAt)}
						summary={featuredEventsItem.summary}
						title={featuredEventsItem.title}
						topic={featuredEventsItem.topics && typeof featuredEventsItem.topics[0] === 'object' ? featuredEventsItem.topics[0] : undefined}
					/>
				)}
			</FrontendSection> */}
			<FrontendSection first>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{regularEventsItems.map(event => (
						<EventCard
							key={event.id}
							coverSrc={typeof event.featured_image === 'object' ? event?.featured_image?.url : undefined}
							endDate={event.end_date ? new Date(event.end_date) : null}
							href={`/event/${event.id}`}
							startDate={new Date(event.start_date)}
							title={event.title}
							topic={event.topics && typeof event.topics[0] === 'object' ? event.topics[0] : undefined}
						/>
					))}
				</div>
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
