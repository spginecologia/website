'use client';

/* * */

import { QuotaPaymentStatus } from '@/components/account/QuotaPaymentStatus';
import { PayloadMeResponse } from '@/types/payload-api-response';
import { Table, TableData, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function AccountQuotasPayments() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountQuotasPayments');

	//
	// B. Fetch data

	const { data: userData, error: userError, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		// Setup table data
		const tableData: TableData = {
			body: [],
			head: [t('table.head.year'), t('table.head.payment_amount'), t('table.head.payment_status')],
		};
		// If no user data, return the empty table
		if (!userData?.user?.quotas?.length) {
			return tableData;
		}
		// If user data exists, map the quotas to table body
		// Sort quotas by year in ascending order
		// and map each payment to a row in the table
		tableData.body = userData.user.quotas
			.sort((a, b) => b.year - a.year)
			.map((item) => {
				return [
					item.year,
					t('table.body.payment_amount', { value: item.payment_amount }),
					<QuotaPaymentStatus paymentLinkUrl={item.payment_link_url} status={item.payment_status} />,
				];
			});
		// Return the table
		return tableData;
	}, [userData]);

	//
	// D. Render components

	if (userLoading) {
		return <Text variant="overline">{t('loading')}</Text>;
	}

	if (!userLoading && userError) {
		return <Text variant="overline">{t('error')}</Text>;
	}

	if (!tableData.body?.length) {
		return <Text variant="overline">{t('no_data')}</Text>;
	}

	return <Table data={tableData} layout="fixed" withTableBorder />;

	// return (
	// 	<>
	// 		{hasUnpaidOptions && (
	// 			<>
	// 				<Alert icon={<IconFlag3Filled />} title={t('alert.title')} w="100%">
	// 					<Text size="sm">{t('alert.message')}</Text>
	// 					<Space h="xs" />
	// 					<form action="/api/account/payments/create-checkout-session" method="POST">
	// 						<Button size="xs" type="submit">{t('alert.action')}</Button>
	// 					</form>
	// 				</Alert>
	// 				<Space h="md" />
	// 			</>
	// 		)}
	// 		<Table data={tableData} layout="fixed" withTableBorder />
	// 	</>
	// );

	//
}
