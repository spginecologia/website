/* * */

import { AccountPaymentsCheckout } from '@/components/account/AccountPaymentsCheckout';
import { AccountPaymentsInvoices } from '@/components/account/AccountPaymentsInvoices';
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
			<Text>{t('subtitle')}</Text>
			<Space h="xl" />
			<AccountPaymentsCheckout />
			<Space h="xl" />
			<AccountPaymentsInvoices />
		</Paper>
	);

	//
}
