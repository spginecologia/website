'use client';

/* * */

import { OpenInvoice } from '@/components/account/OpenInvoice';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Table, TableData, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function AccountQuotasInvoices() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation('account.AccountQuotasInvoices');

	//
	// B. Fetch data

	const { data: userData, error: userDataError, isLoading: userDataLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		// Setup table data
		const tableData: TableData = {
			body: [],
			head: [t('table.head.doc_number'), t('table.head.doc_date'), ''],
		};
		// If no user data, return the empty table
		if (!userData?.user?.quotas?.length) {
			return tableData;
		}
		// Extract all invoices from user payments
		tableData.body = userData.user.quotas
			.flatMap(payment => payment.invoices || [])
			.sort((a, b) => b.doc_system_time.localeCompare(a.doc_system_time))
			.map((item) => {
				return [
					item.doc_number,
					item.doc_system_time.substring(0, 10), // Format date to YYYY-MM-DD
					<OpenInvoice docId={item.doc_id} />,
				];
			});
		// Return the table
		return tableData;
	}, [userData]);

	//
	// D. Render components

	if (userDataLoading) {
		return <Text variant="overline">{t('loading')}</Text>;
	}

	if (userDataError) {
		return <Text variant="overline">{t('error')}</Text>;
	}

	if (!tableData.body?.length) {
		return <Text variant="overline">{t('no_data')}</Text>;
	}

	return <Table data={tableData} layout="fixed" withTableBorder />;

	//
}
