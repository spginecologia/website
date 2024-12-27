'use client';

/* * */

import { CardCoverImage } from '@/components/cards/CardCoverImage';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	coverSrc?: null | string
	duration?: null | number
	views?: null | number
}

/* * */

export function VideoCoverImage({ coverSrc, duration, views = 0 }: Props) {
	//

	//
	// A. Transform data

	const durationString = useMemo(() => {
		if (!duration) return;
		// Convert duration from seconds to hours, minutes and seconds
		const hours = Math.floor(duration / 3600);
		const minutes = Math.floor((duration % 3600) / 60);
		const seconds = duration % 60;
		// Create a string representation of the duration
		const parts: string[] = [];
		if (hours) parts.push(`${hours}`.padStart(2, '0'));
		if (minutes) parts.push(`${minutes}`.padStart(2, '0'));
		if (seconds) parts.push(`${seconds}`.padStart(2, '0'));
		return parts.join(':');
	}, [duration]);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<CardCoverImage aspectRatio="16 / 9" src={coverSrc} />
			{durationString && <p className={styles.duration}>{durationString}</p>}
			<p className={styles.views}>{views} visualizações</p>
		</div>
	);

	//
}
