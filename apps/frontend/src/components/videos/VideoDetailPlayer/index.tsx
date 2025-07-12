'use client';

import { Skeleton } from '@mantine/core';
/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	url?: string
}

/* * */

export function VideoDetailPlayer({ url }: Props) {
	//

	if (!url) {
		return <Skeleton animate className={styles.skeleton} />;
	}

	return (
		<video autoPlay className={styles.player} controls>
			<source src={url} type="video/mp4" />
		</video>
	);

	//
}
