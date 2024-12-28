/* * */

import { AccountVideosList } from '@/components/account/AccountVideosList';
import { Paper, Space, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export function AccountVideos() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountVideos');

	//
	// B. Render components

	return (
		<Paper>
			<Title order={2}>{t('title')}</Title>
			<Space h="xs" />
			<Text>{t('subtitle')}</Text>
			<Space h="xl" />
			<AccountVideosList />
		</Paper>
	);

	//
}
