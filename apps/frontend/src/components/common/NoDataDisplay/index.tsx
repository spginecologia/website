/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function NoDataDisplay() {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.NoDataDisplay');

	//
	// B. Render components

	return <div className={styles.container}>{t('title')}</div>;

	//
}
