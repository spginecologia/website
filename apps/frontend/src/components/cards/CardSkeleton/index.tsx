/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	coverAspectRatio?: string
}

/* * */

export function CardSkeleton({ coverAspectRatio = '1 / 1' }: Props) {
	return (
		<div className={styles.container}>
			<Skeleton animate style={{ aspectRatio: coverAspectRatio }} />
			<Skeleton animate h={20} w="80%" />
			<Skeleton animate h={15} w="60%" />
		</div>
	);
}
