'use client';

/* * */

import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { Paper } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountVideos() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountVideos');

	//
	// B. Fetch data

	const { data: accountVideosData } = useSWR('/api/account/videos');

	console.log(accountVideosData);

	//
	// C. Render components

	return (
		<Paper>
			<div className={styles.container}>
				<Title level="h2" text={t('title')} />
				<Text text={t('subtitle')} />
			</div>
		</Paper>
	);
}
