/* * */

import { AccountQuotasInvoices } from '@/components/account/AccountQuotasInvoices';
import { AccountQuotasPayments } from '@/components/account/AccountQuotasPayments';
import { Paper, Space, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export function AccountQuotas() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountQuotas');

	//
	// B. Render components

	return (
		<Paper>
			<Title order={2}>{t('title')}</Title>
			<Space h="xs" />
			<Text>{t('subtitle')}</Text>
			<Space h="xl" />
			<AccountQuotasPayments />
			<Space h="xl" />
			<AccountQuotasInvoices />
		</Paper>
	);

	//
}
