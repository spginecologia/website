'use client';

/* * */

import { PaymentStatus } from '@/components/account/PaymentStatus';
import { Purchase } from '@/types/payments';
import { Alert, Button, Space, Table, TableData, Text } from '@mantine/core';
import { IconFlag3Filled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function AccountPaymentsCheckout() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountPaymentsCheckout');

	//
	// B. Fetch data

	const { data: balanceStatusData, error: balanceStatusError, isLoading: balanceStatusLoading } = useSWR<Purchase[]>('/api/account/payments/balance-status');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		const bodyData = balanceStatusData?.map((balanceItem) => {
			return [
				balanceItem.price_name,
				t('table.body.amount', { value: balanceItem.amount / 100 }),
				<PaymentStatus status={balanceItem.status} />,
			];
		});
		return {
			body: bodyData,
			head: [t('table.head.price_name'), t('table.head.amount'), t('table.head.status')],
		};
	}, [balanceStatusData]);

	const hasUnpaidOptions = useMemo<boolean>(() => {
		return balanceStatusData?.some(item => item.status === 'unpaid') ?? false;
	}, [balanceStatusData]);

	//
	// D. Render components

	if (balanceStatusLoading) {
		return <Text variant="overline">{t('loading')}</Text>;
	}

	if (!balanceStatusLoading && balanceStatusError) {
		return <Text variant="overline">{t('error')}</Text>;
	}

	if (!tableData.body?.length) {
		return <Text variant="overline">{t('no_data')}</Text>;
	}

	return (
		<>
			{hasUnpaidOptions && (
				<>
					<Alert icon={<IconFlag3Filled />} title={t('alert.title')} w="100%">
						<Text>{t('alert.message')}</Text>
						<Space h="xs" />
						<form action="/api/account/payments/create-checkout-session" method="POST">
							<Button size="xs" type="submit">{t('alert.action')}</Button>
						</form>
					</Alert>
				</>
			)}
			<Space h="md" />
			<Table data={tableData} layout="fixed" withTableBorder />
		</>
	);

	//
}
