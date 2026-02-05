'use client';

/* * */

import { Skeleton } from '@mantine/core';
import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();

	//
	// B. Render components

	if (!date) {
		return <Skeleton className={styles.skeleton} animate />;
	}

	return (
		<div className={styles.container}>
			<span className={styles.day}>{t('events.DateRibbon.day', { value: date })}</span>
			<span className={styles.month}>{t('events.DateRibbon.month', { value: date })}</span>
			<span className={styles.year}>{t('events.DateRibbon.year', { value: date })}</span>
		</div>
	);

	//
}
