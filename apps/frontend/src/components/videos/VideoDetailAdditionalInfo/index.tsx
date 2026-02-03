'use client';

/* * */

import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { Skeleton } from '@mantine/core';
import { DateTime } from 'luxon';
import { type Topic } from 'payload-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

interface VideoDetailAdditionalInfoProps {
	publishDate?: null | string
	topics?: null | Topic[]
	views?: null | number
}

/* * */

export function VideoDetailAdditionalInfo({ publishDate, topics, views = 1 }: VideoDetailAdditionalInfoProps) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Transform data

	const publishDateFormatted = useMemo(() => {
		if (!publishDate) return;
		return DateTime.fromISO(publishDate).toFormat('videos.VideoDetailAdditionalInfo.dd-MM-yyyy');
	}, [publishDate]);

	//
	// C. Render components

	if (!publishDateFormatted || !topics || typeof views !== 'number') {
		return <Skeleton h={250} animate />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.block}>
				<p className={styles.label}>{t('videos.VideoDetailAdditionalInfo.views.label')}</p>
				<p className={styles.value}>{views}</p>
			</div>

			<div className={styles.block}>
				<p className={styles.label}>{t('videos.VideoDetailAdditionalInfo.publish_date.label')}</p>
				<p className={styles.value}>{publishDateFormatted}</p>
			</div>

			<div className={styles.block}>
				<p className={styles.label}>{t('videos.VideoDetailAdditionalInfo.topics.label')}</p>
				<div className={styles.topicsWrapper}>
					{topics?.map(topic => (
						<TopicDisplay key={topic.id} data={topic} />
					))}
				</div>
			</div>

		</div>
	);

	//
}
