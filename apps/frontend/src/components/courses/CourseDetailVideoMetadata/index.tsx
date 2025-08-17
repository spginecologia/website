'use client';

/* * */

import { Skeleton, Title } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface CourseDetailVideoMetadataProps {
	introduction?: null | string
	title?: null | string
}

/* * */

export function CourseDetailVideoMetadata({ introduction, title }: CourseDetailVideoMetadataProps) {
	//

	if (!title) {
		return (
			<div className={styles.container}>
				<Skeleton h={50} animate />
				<Skeleton h={30} animate />
				<Skeleton h={150} mt={15} animate />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Title order={2}>{title}</Title>
			{introduction && <p className={styles.introduction}>{introduction}</p>}
		</div>
	);

	//
}
