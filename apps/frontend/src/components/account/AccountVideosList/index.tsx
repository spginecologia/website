'use client';

/* * */

import { VideoCardRelated } from '@/components/videos/VideoCardRelated';
import { type PayloadAPIResponse } from '@/types/payload-api-response';
import { Text } from '@mantine/core';
import { type Video } from 'payload-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountVideosList() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: accountVideosData, error: accountVideosError, isLoading: accountVideosLoading } = useSWR<PayloadAPIResponse<Video>>('/api/account/videos');

	//
	// C. Transform data

	const videosListData = useMemo<Video[]>(() => {
		if (!accountVideosData) return [];
		return accountVideosData.docs;
	}, [accountVideosData]);

	//
	// D. Render components

	if (accountVideosLoading) {
		return <Text variant="overline">{t('account.AccountVideosList.loading')}</Text>;
	}

	if (accountVideosError) {
		return <Text variant="overline">{t('account.AccountVideosList.error')}</Text>;
	}

	if (!videosListData.length) {
		return <Text variant="overline">{t('account.AccountVideosList.no_data')}</Text>;
	}

	return (
		<div className={styles.container}>
			{videosListData.map(video => (
				<VideoCardRelated
					key={video.id}
					authors={video.authors}
					coverSrc={typeof video.featured_image === 'object' ? video?.featured_image?.url : undefined}
					duration={video.video_file && typeof video.video_file === 'object' ? video.video_file.duration : undefined}
					href={`/academia/videos/${video.id}`}
					title={video.title}
				/>
			))}
		</div>
	);

	//
}
