'use client';

/* * */

import { Button, Space, Table, TableData, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import { PaymentStatus } from '../PaymentStatus';

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
	// E. Render components

	if (optionsLoading) {
		return <Text variant="overline">Loading...</Text>;
	}

	if (!optionsLoading && optionsError) {
		return <Text variant="overline">Error loading data</Text>;
	}

	return (
		<>
			{hasUnpaidOptions && (
				<form action="/api/account/payments/create-checkout-session" method="POST">
					<Button type="submit">Regularizar pagamentos em falta</Button>
					<Space h="md" />
				</form>
			)}
			<Table data={tableData} layout="fixed" withTableBorder />
		</>
	);

	//
}
