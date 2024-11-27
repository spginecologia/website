'use client';

/* * */

import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AccountProfileView() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountProfileView');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Title level="h2" text={t('title')} />
			<Text text={t('subtitle')} />
		</div>
	);

	//
}
