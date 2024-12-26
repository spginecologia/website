/* * */

import { Skeleton } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	date?: Date | null
}

/* * */

export function DateRibbon({ date }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('events.DateRibbon');

	//
	// B. Render components

	if (!date) {
		return <Skeleton className={styles.skeleton} animate />;
	}

	return (
		<div className={styles.container}>
			<span className={styles.day}>{t('day', { value: date })}</span>
			<span className={styles.month}>{t('month', { value: date })}</span>
			<span className={styles.year}>{t('year', { value: date })}</span>
		</div>
	);

	//
}
