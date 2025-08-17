'use client';

/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface VideoDetailPlayerProps {
	url?: string
}

/* * */

export function VideoDetailPlayer({ url }: VideoDetailPlayerProps) {
	//

	if (!url) {
		return <Skeleton className={styles.skeleton} animate />;
	}

	return (
		<video className={styles.player} autoPlay controls>
			<source src={url} type="video/mp4" />
		</video>
	);

	//
}
