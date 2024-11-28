'use client';

/* * */

import { Button, Space, Table, TableData } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountPaymentsPricesList() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountPaymentsPricesList');

	//
	// B. Fetch data

	const { data: optionsData, isLoading: optionsLoading } = useSWR('/api/account/payments/list-options');

	//
	// B. Transform data

	const tableData = useMemo<TableData>(() => {
		console.log(optionsData);
		const bodyData = optionsData?.map((option) => {
			return [
				option.product_name,
				option.price_amount,
				option.already_paid ? t('body.already_paid.true') : t('body.already_paid.false'),
			];
		});
		return {
			body: bodyData,
			head: [t('head.title'), t('head.amount'), t('head.status')],
		};
	}, [optionsData]);

	//
	// C. Render components

	return (
		<>
			<form action="/api/account/payments/create-checkout-session" method="POST" style={{ width: '100%' }}>
				<Button type="submit" w="100%">Regularizar pagamentos em falta</Button>
			</form>
			<Space h="md" />
			<Table data={tableData} highlightOnHover withTableBorder />
		</>
	);

	//
}
