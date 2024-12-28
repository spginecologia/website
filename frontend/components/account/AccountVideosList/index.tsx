'use client';

/* * */

import type { Video } from '@/payload-types';
import type { PayloadAPIResponse } from '@/types/payload-api-response';

import { VideoCardRelated } from '@/components/videos/VideoCardRelated';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountVideosList() {
	//

	//
	// A. Fetch data

	const { data: accountVideosData } = useSWR<PayloadAPIResponse<Video>>('/api/account/videos');

	//
	// B. Transform data

	const videosListData = useMemo<Video[]>(() => {
		if (!accountVideosData) return [];
		return accountVideosData.docs;
	}, [accountVideosData]);

	//
	// C. Render components

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
