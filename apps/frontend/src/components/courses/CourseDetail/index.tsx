'use client';

/* * */

import { AuthWall } from '@/components/auth/AuthWall';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { RedirectDisplay } from '@/components/common/RedirectDisplay';
import { Section } from '@/components/common/Section';
import { CourseDetailVideoMetadata } from '@/components/courses/CourseDetailVideoMetadata';
import { VideoDetailPlayer } from '@/components/videos/VideoDetailPlayer';
import { Space } from '@mantine/core';
import { type Course } from 'payload-types';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function CourseDetail({ id }) {
	//

	//
	// A. Fetch data

	const { data: courseData } = useSWR<Course>(`/api/courses/${id}`);

	//
	// B. Transform data

	const courseFileUrl = useMemo(() => {
		if (!courseData) return;
		if (courseData.content_type === 'file' && typeof courseData.document === 'object') {
			return courseData.document?.url;
		}
		if (courseData.content_type === 'url') {
			return courseData.url;
		}
		return null;
	}, [courseData]);

	const courseVideoUrl = useMemo(() => {
		if (!courseData) return;
		if (courseData.content_type === 'video' && typeof courseData.video === 'object') {
			return courseData.video?.url;
		}
		return null;
	}, [courseData]);

	// const courseTopics = useMemo(() => {
	// 	if (!courseData) return [];
	// 	if (!courseData.topics?.length) return [];
	// 	return courseData.topics.filter(item => typeof item === 'object' && item !== null);
	// }, [courseData]);

	//
	// C. Render components

	if (courseFileUrl) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="transparent">
					<AuthWall>
						<RedirectDisplay href={courseFileUrl} />
					</AuthWall>
				</Section>
			</ContentWrapper>
		);
	}

	if (courseVideoUrl) {
		return (
			<ContentWrapper>
				<Section withTopSpacer="academia">
					<AuthWall>
						<VideoDetailPlayer url={courseVideoUrl} />
					</AuthWall>
					<Space h="lg" />
					<CourseDetailVideoMetadata
						introduction={courseData?.introduction}
						title={courseData?.title}
					/>
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper>
			<Section withTopSpacer="transparent">
				<NoDataDisplay />
			</Section>
		</ContentWrapper>
	);

	//
}
