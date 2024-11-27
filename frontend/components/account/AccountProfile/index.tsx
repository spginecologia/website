'use client';

/* * */

import { AccountProfileEdit } from '@/components/account/AccountProfileEdit';
import { AccountProfileView } from '@/components/account/AccountProfileView';
import Panel from '@/components/Panel/Panel';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function AccountProfile() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountProfile');

	//
	// B. Render components

	return (
		<Panel>
			<div className={styles.container}>
				<Title level="h2" text={t('title')} />
				<Text text={t('subtitle')} />
				<AccountProfileEdit />
			</div>
		</Panel>
	);
}
