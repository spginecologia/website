/* * */

import { useTranslation } from 'react-i18next';

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

	const { t } = useTranslation();

	//
	// B. Render components

	return <div className={styles.container}>{text || t('common.NoDataDisplay.title')}</div>;

	//
}
