/* * */

import { AccountProfileForm } from '@/src/components/account/AccountProfileForm';
import { Paper, Space, Text, Title } from '@mantine/core';
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
			<Space h="xs" />
			<Text>{t('subtitle')}</Text>
			<Space h="xl" />
			<AccountProfileForm />
		</Paper>
	);

	//
}
