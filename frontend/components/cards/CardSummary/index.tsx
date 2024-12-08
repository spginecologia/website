/* * */

import { Skeleton, Text } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	text?: null | string
}

/* * */

export function CardSummary({ text }: Props) {
	//

	if (!text) {
		return (
			<div className={styles.skeletonWrapper}>
				<Skeleton h={15} w="80%" animate />
				<Skeleton h={15} w="100%" animate />
				<Skeleton h={15} w="60%" animate />
			</div>
		);
	}

	if (text.length > 153) {
		return <Text>{text.substring(0, 150)}...</Text>;
	}

	return <Text>{text}</Text>;

	//
}
