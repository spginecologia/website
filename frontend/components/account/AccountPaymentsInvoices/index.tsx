'use client';

/* * */

import type { PayloadMeResponse } from '@/types/payload-api-response';

import { Table, TableData, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountPaymentsInvoices() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountPaymentsInvoices');

	//
	// B. Fetch data

	const { data: userData, error: userDataError, isLoading: userDataLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		const bodyData = userData?.user.invoices?.map((invoiceItem) => {
			return [
				invoiceItem.invoice_number,
				invoiceItem.invoice_date,
				<a className={styles.openPdf} href={`/api/account/payments/get-invoice-pdf/${invoiceItem.invoice_id}`} target="_blank">Abrir PDF <IconExternalLink size={14} /></a>,
			];
		});
		return {
			body: bodyData,
			head: [t('table.head.invoice_number'), t('table.head.invoice_date'), ''],
		};
	}, [userData]);

	//
	// D. Render components

	if (userDataLoading) {
		return <Text variant="overline">{t('loading')}</Text>;
	}

	if (!userDataLoading && userDataError) {
		return <Text variant="overline">{t('error')}</Text>;
	}

	if (!tableData.body?.length) {
		return <Text variant="overline">{t('no_data')}</Text>;
	}

	return (
		<Table data={tableData} layout="fixed" withTableBorder />
	);

	//
}
