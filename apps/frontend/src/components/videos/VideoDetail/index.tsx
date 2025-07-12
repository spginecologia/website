'use client';

/* * */

import { AuthWall } from '@/src/components/auth/AuthWall';
import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { Section } from '@/src/components/common/Section';
import { VideoDetailAdditionalInfo } from '@/src/components/videos/VideoDetailAdditionalInfo';
import { VideoDetailDescription } from '@/src/components/videos/VideoDetailDescription';
import { VideoDetailMetadata } from '@/src/components/videos/VideoDetailMetadata';
import { VideoDetailPlayer } from '@/src/components/videos/VideoDetailPlayer';
import { VideoDetailRelatedVideos } from '@/src/components/videos/VideoDetailRelatedVideos';
import { type Topic, type Video } from '@/payload-types';
import { PayloadAPIResponse } from '@/src/types/payload-api-response';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function VideoDetail({ id }) {
	//

	//
	// A. Fetch data

	const { data: videoData } = useSWR<Video>(`/api/videos/${id}`);
	const { data: allVideosData } = useSWR<PayloadAPIResponse<Video>>(`/api/videos`);

	//
	// B. Render components

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

	const relatedVideos = useMemo(() => {
		if (!videoTopics || !allVideosData || !videoData) return;
		return allVideosData.docs.filter((video) => {
			if (!video.topics || !video.topics.length) return false;
			if (video.id === videoData.id) return false;
			return video.topics.some(topic => videoTopics.some(vt => typeof topic === 'object' && vt.id === topic.id));
		});
	}, [videoData, videoTopics, allVideosData]);

	//
	// C. Render components

	return (
		<ContentWrapper>
			<Section withTopSpacer="transparent">
				<AuthWall>
					<div className={styles.grid}>

						<div className={styles.content}>
							<VideoDetailPlayer url={videoFileUrl} />
							<VideoDetailMetadata authors={videoData?.authors} introduction={videoData?.introduction} title={videoData?.title} />
							<VideoDetailDescription description={videoData?.description} />
						</div>

						<div className={styles.sidebar}>
							<VideoDetailAdditionalInfo publishDate={videoData?.createdAt} topics={videoTopics} views={videoData?.views} />
							{/* <VideoDetailPublishConfig /> */}
							<VideoDetailRelatedVideos list={relatedVideos} />
						</div>

					</div>
				</AuthWall>
			</Section>
		</ContentWrapper>
	);

	//
}
