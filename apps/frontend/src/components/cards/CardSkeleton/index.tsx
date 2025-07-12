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
			<Skeleton style={{ aspectRatio: coverAspectRatio }} animate />
			<Skeleton h={20} w="80%" animate />
			<Skeleton h={15} w="60%" animate />
		</div>
	);
}
