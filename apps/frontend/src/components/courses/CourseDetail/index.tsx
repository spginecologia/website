'use client';

/* * */

import { AuthWall } from '@/components/auth/AuthWall';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { RedirectDisplay } from '@/components/common/RedirectDisplay';
import { Section } from '@/components/common/Section';
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

	const courseHref = useMemo(() => {
		if (!courseData) return;
		if (courseData.content_type === 'file' && typeof courseData.document === 'object') {
			return courseData.document?.url;
		}
		if (courseData.content_type === 'url') {
			return courseData.url;
		}
	}, [courseData]);

	//
	// C. Render components

	return (
		<ContentWrapper>
			<Section withTopSpacer="transparent">
				<AuthWall>
					<RedirectDisplay href={courseHref} />
				</AuthWall>
			</Section>
		</ContentWrapper>
	);

	//
}
