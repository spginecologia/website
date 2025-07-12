'use client';

/* * */

import type { Event } from '@/payload-types';

import { ErrorDisplay } from '@/src/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/src/components/common/NoDataDisplay';
import { Section } from '@/src/components/common/Section';
import { EventCard } from '@/src/components/events/EventCard';
import { PayloadAPIResponse } from '@/src/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function HomeEvents() {
	//

	//
	// A. Setup variables

	const t = useTranslations('home.HomeEvents');

	//
	// B. Fetch data

	const { data: allEventsData, error: allEventsError, isLoading: allEventsLoading } = useSWR<PayloadAPIResponse<Event>>(`/api/events`);

	//
	// C. Transform data

	const sortedEventsData = useMemo(() => {
		if (!allEventsData) return [];
		return allEventsData.docs
			.filter(event => new Date(event.start_date) >= new Date())
			.sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
			.slice(0, 3);
	}, [allEventsData]);

	//
	// D. Render components

	if (allEventsLoading) {
		return (
			<Section>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{[...Array(2)].map((_, i) => <EventCard key={i} />)}
				</div>
			</Section>
		);
	}

	if (allEventsError) {
		return (
			<Section>
				<Title order={1}>{t('title')}</Title>
				<ErrorDisplay />
			</Section>
		);
	}

	if (!sortedEventsData.length) {
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
				{sortedEventsData.map(eventData => (
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
	);

	//
}
