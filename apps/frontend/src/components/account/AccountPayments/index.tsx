/* * */

import { AccountPaymentsCheckout } from '@/src/components/account/AccountPaymentsCheckout';
import { AccountPaymentsTransactions } from '@/src/components/account/AccountPaymentsTransactions';
import { Paper, Space, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export function AccountPayments() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountPayments');

	//
	// B. Render components

	return (
		<Paper>
			<Title order={2}>{t('title')}</Title>
			<Space h="xs" />
			<Text>{t('subtitle')}</Text>
			<Space h="xl" />
			<AccountPaymentsCheckout />
			<Space h="xl" />
			<AccountPaymentsTransactions />
		</Paper>
	);

	//
}
