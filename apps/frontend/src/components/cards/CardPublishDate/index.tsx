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

	const { t } = useTranslation('common.CardPublishDate');

	//
	// B. Render components

	if (!date) {
		return <Skeleton h={15} w="60%" animate />;
	}

	return <p className={styles.date}>{t('publish_date', { value: date })}</p>;

	//
}
