'use client';

/* * */

import { getUserDisplayName } from '@/services/payload/collections/User/utils/get-user-display-name';
import { getUserGenderFromTitle } from '@/services/payload/collections/User/utils/get-user-gender-from-title';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Skeleton, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountIntro() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Fetch data

	const { data: userData, error: userError, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Transform data

	const userDisplayName = getUserDisplayName(userData?.user?.title, userData?.user?.first_name);
	const userGender = getUserGenderFromTitle(userData?.user?.title);

	//
	// D. Render components

	if (userLoading) {
		return (
			<div className={styles.container}>
				<Skeleton h={40} w={300} />
				<Skeleton h={20} w={250} />
				<Skeleton h={20} w={350} />
			</div>
		);
	}

	if (userError) {
		return (
			<div className={styles.container}>
				<Text variant="overline">{t('account.AccountIntro.error')}</Text>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Title id={styles.displayName} order={2}>{t('account.AccountIntro.title', { name: userDisplayName })}</Title>
			<Text variant="overline">{userData?.user?.email}</Text>
			{userGender === 'female' && <Text variant="overline">{t('account.AccountIntro.member_since.female', { value: userData?.user?.member_since ?? '-' })}</Text>}
			{userGender === 'male' && <Text variant="overline">{t('account.AccountIntro.member_since.male', { value: userData?.user?.member_since ?? '-' })}</Text>}
			{userGender === 'other' && <Text variant="overline">{t('account.AccountIntro.member_since.other', { value: userData?.user?.member_since ?? '-' })}</Text>}
		</div>
	);

	//
}
