'use client';

/* * */

import { AccountQuotasInvoices } from '@/components/account/AccountQuotasInvoices';
import { AccountQuotasPayments } from '@/components/account/AccountQuotasPayments';
import { AccountQuotasRefresh } from '@/components/account/AccountQuotasRefresh';
import { Paper, Space, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function AccountQuotas() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<Paper>
			<Title order={2}>{t('account.AccountQuotas.title')}</Title>
			<Space h="xs" />
			<Text>{t('account.AccountQuotas.subtitle')}</Text>
			<Space h="xl" />
			<AccountQuotasPayments />
			<Space h="xl" />
			<AccountQuotasInvoices />
			<Space h="xl" />
			<AccountQuotasRefresh />
		</Paper>
	);

	//
}
