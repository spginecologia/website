'use client';

/* * */

import { Section } from '@/components/common/Section';
import { CourseCard } from '@/components/courses/CourseCard';
import { type PayloadAPIResponse } from '@/types/payload-api-response';
import { Button, Title } from '@mantine/core';
import Link from 'next/link';
import { type Course } from 'payload-types';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AcademiaHomeCourses() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: allCoursesData } = useSWR<PayloadAPIResponse<Course>>(`/api/courses`);

	//
	// C. Transform data

	const featuredItems = useMemo(() => {
		if (!allCoursesData) return [];
		return allCoursesData.docs
			.sort((a, b) => b.publishedAt?.localeCompare(a.publishedAt))
			.slice(0, 4);
	}, [allCoursesData]);

	//
	// D. Render components

	if (!featuredItems.length) {
		return null;
	}

	return (
		<Section>
			<Title order={1}>{t('academia.AcademiaHomeCourses.title')}</Title>
			<div className={styles.grid}>
				{featuredItems.map(courseData => (
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
			<Button component={Link} href="/academia/courses" m="auto" mt="xl">
				{t('academia.AcademiaHomeCourses.see_all')}
			</Button>
		</Section>
	);

	//
}
