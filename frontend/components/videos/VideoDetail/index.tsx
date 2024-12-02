'use client';

/* * */

import type { Topic, Video } from '@/payload-types';

import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { VideoDetailAdditionalInfo } from '@/components/videos/VideoDetailAdditionalInfo';
// import { VideoDetailDescription } from '@/components/videos/VideoDetailDescription';
import { VideoDetailMetadata } from '@/components/videos/VideoDetailMetadata';
import { VideoDetailPlayer } from '@/components/videos/VideoDetailPlayer';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function VideoDetail({ id }) {
	//

	//
	// A. Setup variables

	//
	// B. Fetch data

	const { data: videoData } = useSWR<Video>(`/api/videos/${id}`);

	console.log(videoData);

	//
	// A. Render components

	const videoFileUrl = useMemo(() => {
		if (!videoData || !videoData.video_file) return;
		if (typeof videoData.video_file === 'string' || !videoData.video_file.url) return;
		return videoData.video_file.url;
	}, [videoData]);

	const videoTopics = useMemo(() => {
		if (!videoData || !videoData.topics || !videoData.topics.length) return;
		if (videoData.topics.some(i => typeof i === 'string')) return;
		return videoData.topics as Topic[];
	}, [videoData]);

	//
	// A. Render components

	return (
		<FrontendWrapperInner>
			<FrontendSection first>
				<div className={styles.grid}>

					<div className={styles.content}>
						<VideoDetailPlayer url={videoFileUrl} />
						<VideoDetailMetadata authors={videoData?.authors} introduction={videoData?.introduction} title={videoData?.title} />
						{/* <VideoDetailDescription description={videoData.description} /> */}
					</div>

					<div className={styles.sidebar}>
						<VideoDetailAdditionalInfo publishDate={videoData?.createdAt} topics={videoTopics} views={0} />
					</div>

				</div>
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
