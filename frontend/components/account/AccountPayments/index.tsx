'use client';

/* * */

import { AccountPaymentsCheckout } from '@/components/account/AccountPaymentsCheckout';
import Panel from '@/components/Panel/Panel';
import { Space, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export function AccountPayments() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountSubscription');

	//
	// B. Render components

	return (
		<Panel>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h="md" />
			<AccountPaymentsCheckout />
		</Panel>
	);

	//
}
