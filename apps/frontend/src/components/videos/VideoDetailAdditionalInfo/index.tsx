'use client';

/* * */

import type { Topic } from '@/payload-types';

import { TopicDisplay } from '@/components/topics/TopicDisplay';
import { Skeleton } from '@mantine/core';
import { DateTime } from 'luxon';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	publishDate?: null | string
	topics?: null | Topic[]
	views?: null | number
}

/* * */

export function VideoDetailAdditionalInfo({ publishDate, topics, views = 1 }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('videos.VideoDetailAdditionalInfo');

	//
	// B. Transform data

	const publishDateFormatted = useMemo(() => {
		if (!publishDate) return;
		return DateTime.fromISO(publishDate).toFormat('dd-MM-yyyy');
	}, [publishDate]);

	//
	// C. Render components

	if (!publishDateFormatted || !topics || typeof views !== 'number') {
		return <Skeleton animate h={250} />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.block}>
				<p className={styles.label}>{t('views.label')}</p>
				<p className={styles.value}>{views}</p>
			</div>

			<div className={styles.block}>
				<p className={styles.label}>{t('publish_date.label')}</p>
				<p className={styles.value}>{publishDateFormatted}</p>
			</div>

			<div className={styles.block}>
				<p className={styles.label}>{t('topics.label')}</p>
				<div className={styles.topicsWrapper}>
					{topics?.map(topic => (
						<TopicDisplay description={topic.description} id={topic.id} key={topic.id} title={topic.title} />
					))}
				</div>
			</div>

		</div>
	);

	//
}
