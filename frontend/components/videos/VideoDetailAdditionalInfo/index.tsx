'use client';

/* * */

import type { Topic } from '@/payload-types';

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	publishDate?: null | string
	topics?: null | Topic[]
	views?: null | number
}

/* * */

export function VideoDetailAdditionalInfo({ publishDate, topics, views }: Props) {
	//

	if (!publishDate || !topics || !views) {
		return <Skeleton h={250} animate />;
	}

	return (
		<div className={styles.container}>
			{/* <Title order={2}>{title}</Title>
			<p className={styles.authors}>{authors}</p>
			<p className={styles.introduction}>{introduction}</p> */}
		</div>
	);

	//
}
