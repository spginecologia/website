/* * */

import { Skeleton, Text } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	size?: 'md' | 'sm'
	text?: null | string
}

/* * */

export function CardSummary({ size = 'md', text }: Props) {
	//

	if (!text) {
		return (
			<div className={styles.skeletonWrapper}>
				<Skeleton animate h={15} w="80%" />
				<Skeleton animate h={15} w="100%" />
				<Skeleton animate h={15} w="60%" />
			</div>
		);
	}

	if (text.length > 153) {
		return (
			<Text size={size}>
				{text.substring(0, 150)}
				...
			</Text>
		);
	}

	return <Text size={size}>{text}</Text>;

	//
}
