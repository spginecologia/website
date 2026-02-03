'use client';

import { useTranslation } from 'react-i18next';

import styles from './NoDataLabel.module.css';

export default function NoDataLabel({ fill = false, text }) {
	//

	const { t } = useTranslation('NoDataLabel');

	return <div className={`${styles.container} ${fill && styles.fill}`}>{text || t('title')}</div>;
}
