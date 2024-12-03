/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function ErrorDisplay() {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.ErrorDisplay');

	//
	// B. Render components

	return <div className={styles.container}>{t('title')}</div>;

	//
}
