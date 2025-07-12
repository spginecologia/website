'use client';

/* * */

import type { Event } from '@/payload-types';

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { ErrorDisplay } from '@/src/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/src/components/common/NoDataDisplay';
import { Section } from '@/src/components/common/Section';
import { EventCard } from '@/src/components/events/EventCard';
import { EventsListPastButton } from '@/src/components/events/EventsListPastButton';
import { PayloadAPIResponse } from '@/src/types/payload-api-response';
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

	const featuredEventItem = useMemo(() => {
		if (!allEventsData) return null;
		return allEventsData.docs
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
			.filter(event => event.is_featured)
			.pop();
	}, [allEventsData]);

	const regularEventsItems = useMemo(() => {
		if (!allEventsData) return [];
		return allEventsData.docs
			.filter(event => event.id !== featuredEventItem?.id)
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}, [allEventsData, featuredEventItem]);

	//
	// D. Render components

	if (allEventsLoading) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="transparent">
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <EventCard key={i} />)}
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	if (allEventsError) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="transparent">
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	if (!allEventsData?.docs.length) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="transparent">
					<Title order={1}>{t('title')}</Title>
					<NoDataDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper>
			{featuredEventItem && (
				<Section withTopSpacer="transparent">
					<div className={styles.featuredEventWrapper}>
						<EventCard
							key={featuredEventItem.id}
							coverSrc={typeof featuredEventItem.featured_image === 'object' ? featuredEventItem?.featured_image?.url : undefined}
							endDate={featuredEventItem.end_date ? new Date(featuredEventItem.end_date) : null}
							href={`/event/${featuredEventItem.id}`}
							startDate={new Date(featuredEventItem.start_date)}
							title={featuredEventItem.title}
							topic={featuredEventItem.topics && typeof featuredEventItem.topics[0] === 'object' ? featuredEventItem.topics[0] : undefined}
						/>
						<EventsListPastButton />
					</div>
				</Section>
			)}
			<Section withTopSpacer="transparent">
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{regularEventsItems.map(eventData => (
						<EventCard
							key={eventData.id}
							coverSrc={typeof eventData.featured_image === 'object' ? eventData.featured_image?.url : undefined}
							endDate={eventData.end_date ? new Date(eventData.end_date) : null}
							href={`/events/${eventData.id}`}
							startDate={new Date(eventData.start_date)}
							title={eventData.title}
							topic={eventData.topics && typeof eventData.topics[0] === 'object' ? eventData.topics[0] : undefined}
						/>
					))}
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
