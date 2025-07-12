'use client';

/* * */

import type { Video } from '@/payload-types';

import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { ErrorDisplay } from '@/src/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/src/components/common/NoDataDisplay';
import { Section } from '@/src/components/common/Section';
import { VideoCard } from '@/src/components/videos/VideoCard';
import { VideoCardFeatured } from '@/src/components/videos/VideoCardFeatured';
import { PayloadAPIResponse } from '@/src/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function VideosList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('videos.VideosList');

	//
	// B. Fetch data

	const { data: allVideosData, error: allVideosError, isLoading: allVideosLoading } = useSWR<PayloadAPIResponse<Video>>(`/api/videos?limit=1000&sort=-publishedAt`);

	//
	// C. Transform data

	const featuredVideosItems = useMemo(() => {
		if (!allVideosData) return [];
		return allVideosData.docs
			.sort((a, b) => b.publishedAt?.localeCompare(a.publishedAt))
			.filter(video => video.is_featured)
			.slice(0, 3);
	}, [allVideosData]);

	const regularVideosItems = useMemo(() => {
		if (!allVideosData) return [];
		const featuredVideosIds = featuredVideosItems?.map(video => video.id);
		return allVideosData.docs
			.filter(video => !featuredVideosIds?.includes(video.id))
			.sort((a, b) => b.publishedAt?.localeCompare(a.publishedAt));
	}, [allVideosData, featuredVideosItems]);

	//
	// D. Render components

	if (allVideosLoading) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <VideoCard key={i} />)}
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	if (allVideosError) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	if (!allVideosData?.docs.length) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<Title order={1}>{t('title')}</Title>
					<NoDataDisplay />
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper>
			{featuredVideosItems.length > 0 && (
				<Section withTopSpacer="academia">
					<div className={styles.featuredWrapper}>
						{featuredVideosItems.map(video => (
							<VideoCardFeatured
								key={video.id}
								authors={video.authors}
								coverSrc={typeof video.featured_image === 'object' ? video?.featured_image?.url : undefined}
								duration={video.video_file && typeof video.video_file === 'object' ? video.video_file.duration : undefined}
								href={`/academia/videos/${video.id}`}
								summary={video.introduction}
								title={video.title}
								topic={video.topics && typeof video.topics[0] === 'object' ? video.topics[0] : undefined}
								views={video.views}
							/>
						))}
					</div>
				</Section>
			)}
			<Section>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{regularVideosItems.map(video => (
						<VideoCard
							key={video.id}
							authors={video.authors}
							coverSrc={typeof video.featured_image === 'object' ? video?.featured_image?.url : undefined}
							duration={video.video_file && typeof video.video_file === 'object' ? video.video_file.duration : undefined}
							href={`/academia/videos/${video.id}`}
							summary={video.introduction}
							title={video.title}
							topic={video.topics && typeof video.topics[0] === 'object' ? video.topics[0] : undefined}
							views={video.views}
						/>
					))}
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
