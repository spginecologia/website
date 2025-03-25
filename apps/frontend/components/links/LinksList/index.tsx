'use client';

/* * */

import type { Link } from '@/payload-types';
import type { PayloadAPIResponse } from '@/types/payload-api-response';

import { ErrorDisplay } from '@/components/common/ErrorDisplay';
import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { LinkItem } from '@/components/links/LinkItem';
import { Skeleton } from '@mantine/core';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function LinksList() {
	//

	//
	// A. Fetch data

	const { data: allActiveLinksData, error: allActiveLinksError, isLoading: allActiveLinksLoading } = useSWR<PayloadAPIResponse<Link>>('/api/links');

	//
	// B. Transform data

	const allActiveLinksDataSorted = useMemo(() => {
		if (!allActiveLinksData) return [];
		return allActiveLinksData.docs.sort((a, b) => a.sort_order - b.sort_order);
	}, [allActiveLinksData]);

	//
	// C. Render components

	if (allActiveLinksLoading) {
		return (
			<div className={styles.container}>
				{[...Array(5)].map((_, i) => <Skeleton key={i} h={75} />)}
			</div>
		);
	}

	if (allActiveLinksError) {
		return <ErrorDisplay />;
	}

	if (!allActiveLinksDataSorted.length) {
		return <NoDataDisplay />;
	}

	return (
		<div className={styles.container}>
			{allActiveLinksDataSorted.map(item => <LinkItem key={item.id} linkData={item} />)}
		</div>
	);

	//
}
