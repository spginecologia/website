/* * */

import { Skeleton } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	text?: null | string
	variant?: 'default' | 'serif'
}

/* * */

export function CardTitle({ text, variant = 'default' }: Props) {
	//

	if (!text) {
		return <Skeleton animate h={20} w="80%" />;
	}

	if (variant === 'serif') {
		return <h3 className={`${styles.title} ${styles.variantSerif}`}>{text}</h3>;
	}

	return <h3 className={`${styles.title} ${styles.variantDefault}`}>{text}</h3>;

	//
}
