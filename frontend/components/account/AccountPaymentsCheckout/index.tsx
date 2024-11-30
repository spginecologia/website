'use client';

/* * */

import { PaymentStatus } from '@/components/account/PaymentStatus';
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

	const { data: optionsData, error: optionsError, isLoading: optionsLoading } = useSWR('/api/account/payments/list-options');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		const bodyData = optionsData?.map((option) => {
			return [
				option.product_name,
				t('table.body.price_amount', { value: option.price_amount }),
				option.already_paid ? <PaymentStatus status="paid" /> : <PaymentStatus status="unpaid" />,
			];
		});
		return {
			body: bodyData,
			head: [t('table.head.product_name'), t('table.head.price_amount'), t('table.head.already_paid')],
		};
	}, [optionsData]);

	const hasUnpaidOptions = useMemo<boolean>(() => {
		return optionsData?.some(option => !option.already_paid);
	}, [optionsData]);

	//
	// D. Render components

	if (optionsLoading) {
		return <Text variant="overline">{t('loading')}</Text>;
	}

	if (!optionsLoading && optionsError) {
		return <Text variant="overline">{t('error')}</Text>;
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
