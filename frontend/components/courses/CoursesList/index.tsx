'use client';

/* * */

import type { Course } from '@/payload-types';

import { CardSkeleton } from '@/components/cards/CardSkeleton';
import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { CourseCard } from '@/components/courses/CourseCard';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { PayloadAPIResponse } from '@/types/payload-api-response';
import { Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function CoursesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('courses.CoursesList');

	//
	// B. Fetch data

	const { data: allCoursesData, error: allCoursesError, isLoading: allCoursesLoading } = useSWR<PayloadAPIResponse<Course>>(`/api/courses`);

	//
	// C. Render components

	if (allCoursesLoading) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<div className={styles.grid}>
						{[...Array(10)].map((_, i) => <CardSkeleton key={i} coverAspectRatio="600 / 300" />)}
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (allCoursesError) {
		return (
			<FrontendWrapperInner>
				<FrontendSection first>
					<Title order={1}>{t('title')}</Title>
					<ErrorDisplay />
				</FrontendSection>
			</FrontendWrapperInner>
		);
	}

	if (!allCoursesData?.docs.length) {
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
			<FrontendSection first>
				<Title order={1}>{t('title')}</Title>
				<div className={styles.grid}>
					{allCoursesData?.docs.map(courseData => (
						<CourseCard
							key={courseData.id}
							coverSrc={typeof courseData.featured_image === 'object' ? courseData?.featured_image?.url : undefined}
							href={`/academia/courses/${courseData.id}`}
							publishDate={new Date(courseData.createdAt)}
							title={courseData.title}
							topic={courseData.topics && typeof courseData.topics[0] === 'object' ? courseData.topics[0] : undefined}
						/>
					))}
				</div>
			</FrontendSection>
		</FrontendWrapperInner>
	);

	//
}
