'use client';

/* * */

import { NoDataDisplay } from '@/components/common/NoDataDisplay';
import { LinkItem } from '@/components/links/LinkItem';
import { LinksFooter } from '@/components/links/LinksFooter';
import { LinksHeader } from '@/components/links/LinksHeader';
import { Loader } from '@mantine/core';
import { useMemo } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function LinksMain() {
	//

	//
	// A. Fetch data

	const { data: allActiveLinksData, isLoading: allActiveLinksLoading } = useSWR('/api/links/active');

	//
	// B. Transform data

	const allActiveLinksDataSorted = useMemo(() => {
		if (!allActiveLinksData) return [];
		return allActiveLinksData.filter(item => item.is_active === true);
	}, [allActiveLinksData]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<LinksHeader />
			{allActiveLinksLoading ? <Loader /> : allActiveLinksDataSorted && allActiveLinksDataSorted.length > 0 ? allActiveLinksDataSorted.map(item => <LinkItem key={item._id} linkData={item} />) : <NoDataDisplay />}
			<LinksFooter />
		</div>
	);

	//
}
