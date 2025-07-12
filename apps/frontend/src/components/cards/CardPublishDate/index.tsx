/* * */

import { Skeleton } from '@mantine/core';
import { useTranslations } from 'next-intl';

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

	const t = useTranslations('common.CardPublishDate');

	//
	// B. Render components

	if (!date) {
		return <Skeleton animate h={15} w="60%" />;
	}

	return <p className={styles.date}>{t('publish_date', { value: date })}</p>;

	//
}
