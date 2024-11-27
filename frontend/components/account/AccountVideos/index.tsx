'use client';

/* * */

import Panel from '@/components/Panel/Panel';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AccountVideos() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountVideos');

	//
	// C. Render components

	return (
		<Panel>
			<div className={styles.container}>
				<Title level="h2" text={t('title')} />
				<Text text={t('subtitle')} />
			</div>
		</Panel>
	);
}
