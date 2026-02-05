'use client';

/* * */

import { Section } from '@/components/common/Section';
import { VideoCardFeatured } from '@/components/videos/VideoCardFeatured';
import { type PayloadAPIResponse } from '@/types/payload-api-response';
import { Button, Title } from '@mantine/core';
import Link from 'next/link';
import { type Video } from 'payload-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AcademiaHomeVideos() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: allVideosData } = useSWR<PayloadAPIResponse<Video>>(`/api/academia/videos?limit=1000&sort=-publishedAt`);

	//
	// C. Transform data

	const featuredItems = useMemo(() => {
		if (!allVideosData) return [];
		return allVideosData.docs
			.sort((a, b) => b.publishedAt?.localeCompare(a.publishedAt))
			.filter(video => video.is_featured)
			.slice(0, 3);
	}, [allVideosData]);

	//
	// D. Render components

	if (!featuredItems.length) {
		return null;
	}

	return (
		<Section>
			<Title order={1}>{t('academia.AcademiaHomeVideos.title')}</Title>
			<div className={styles.grid}>
				{featuredItems.map(video => (
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
			<Button component={Link} href="/academia/videos" m="auto" mt="xl">
				{t('academia.AcademiaHomeVideos.see_all')}
			</Button>
		</Section>
	);

	//
}
