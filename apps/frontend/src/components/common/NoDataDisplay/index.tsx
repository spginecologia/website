/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface NoDataDisplayProps {
	text?: string
}

/* * */

export function NoDataDisplay({ text }: NoDataDisplayProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.NoDataDisplay');

	//
	// B. Render components

	return <div className={styles.container}>{text || t('title')}</div>;

	//
}
