'use client';

/* * */

import { QuotaPaymentStatus } from '@/components/account/QuotaPaymentStatus';
import { PayloadMeResponse } from '@/types/payload-api-response';
import { Table, TableData, Text } from '@mantine/core';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

/* * */

export function AccountQuotasPayments() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: userData, error: userError, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		// Setup table data
		const tableData: TableData = {
			body: [],
			head: [t('account.AccountQuotasPayments.table.head.year'), t('account.AccountQuotasPayments.table.head.payment_amount'), t('account.AccountQuotasPayments.table.head.payment_status')],
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
					t('account.AccountQuotasPayments.table.body.payment_amount', { value: item.payment_amount }),
					<QuotaPaymentStatus paymentLinkUrl={item.payment_link_url} status={item.payment_status} />,
				];
			});
		// Return the table
		return tableData;
	}, [userData]);

	//
	// D. Render components

	if (userLoading) {
		return <Text variant="overline">{t('account.AccountQuotasPayments.loading')}</Text>;
	}

	if (!userLoading && userError) {
		return <Text variant="overline">{t('account.AccountQuotasPayments.error')}</Text>;
	}

	if (!tableData.body?.length) {
		return <Text variant="overline">{t('account.AccountQuotasPayments.no_data')}</Text>;
	}

	return <Table data={tableData} layout="fixed" withTableBorder />;

	//
}
