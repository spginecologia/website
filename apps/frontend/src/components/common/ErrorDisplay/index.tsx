'use client';

/* * */

import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function ErrorDisplay() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return <div className={styles.container}>{t('common.ErrorDisplay.title')}</div>;

	//
}
