'use client';

/* * */

import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Table, TableData, Text } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountPaymentsTransactions() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountPaymentsTransactions');

	//
	// B. Fetch data

	const { data: userData, error: userDataError, isLoading: userDataLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Transform data

	const tableData = useMemo<TableData>(() => {
		const bodyData = userData?.user?.transactions?.map((transactionItem) => {
			return [
				transactionItem.doc_number,
				transactionItem.doc_date,
				<a className={styles.openPdf} href={`/api/account/payments/get-transaction-pdf/${transactionItem.doc_id}`} target="_blank">Abrir PDF <IconExternalLink size={14} /></a>,
			];
		});
		return {
			body: bodyData || [],
			head: [t('table.head.doc_number'), t('table.head.doc_date'), ''],
		};
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

	return (
		<Table data={tableData} layout="fixed" withTableBorder />
	);

	//
}
