'use client';

import { useTranslations } from 'next-intl';

import styles from './NoDataLabel.module.css';

export default function NoDataLabel({ fill = false, text }) {
	//

	const t = useTranslations('NoDataLabel');

	return <div className={`${styles.container} ${fill && styles.fill}`}>{text || t('title')}</div>;
}
