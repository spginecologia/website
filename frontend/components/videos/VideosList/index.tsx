'use client';

/* * */

import type { Video } from '@/payload-types';

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { VideoCard } from '@/components/videos/VideoCard';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import { VideoCardFeatured } from '../VideoCardFeatured';
import styles from './styles.module.css';

/* * */

export function VideosList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('videos.VideosList');

	//
	// B. Fetch data

	const { data: allVideosData, error: allVideosError, isLoading: allVideosLoading } = useSWR<PayloadAPIResponse<Video>>(`/api/videos`);

	//
	// C. Transform data

	const featuredVideosItems = useMemo(() => {
		if (!allVideosData) return [];
		return allVideosData.docs
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
			.filter(video => video.is_featured)
			.slice(0, 3);
	}, [allVideosData]);

	const regularVideosItems = useMemo(() => {
		if (!allVideosData) return [];
		const featuredVideosIds = featuredVideosItems?.map(video => video.id);
		return allVideosData.docs
			.filter(video => !featuredVideosIds?.includes(video.id))
			.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
	}, [allVideosData, featuredVideosItems]);

	//
	// D. Render components

	if (allVideosLoading) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <VideoCard key={i} />)}
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (allVideosError) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (!allVideosData?.docs.length) {
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
			{featuredVideosItems.length > 0 && (
				<FrontendSection first>
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
				</FrontendSection>
			)}
			<FrontendSection first>
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
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
