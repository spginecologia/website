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

export function CardPublishDate({ date }: Props) {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	if (!date) {
		return <Skeleton h={15} w="60%" animate />;
	}

	return <p className={styles.date}>{t('common.CardPublishDate.publish_date', { value: date })}</p>;

	//
}
