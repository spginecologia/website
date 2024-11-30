/* * */

import { AccountProfileEdit } from '@/components/account/AccountProfileEdit';
import { Paper, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export function AccountProfile() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountProfile');

	//
	// B. Render components

	return (
		<Paper>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<AccountProfileEdit />
		</Paper>
	);

	//
}
