/* * */

import { AccountVideosList } from '@/components/account/AccountVideosList';
import { Paper, Space, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function AccountVideos() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<Paper>
			<Title order={2}>{t('account.AccountVideos.title')}</Title>
			<Space h="xs" />
			<Text>{t('account.AccountVideos.subtitle')}</Text>
			<Space h="xl" />
			<AccountVideosList />
		</Paper>
	);

	//
}
