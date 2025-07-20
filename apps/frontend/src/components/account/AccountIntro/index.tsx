/* * */

import { type PayloadMeResponse } from '@/types/payload-api-response';
import { getUserDisplayName } from '@/services/general/get-user-display-name';
import { getUserGenderFromTitle } from '@/services/general/get-user-gender-from-title';
import { Skeleton, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountIntro() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountIntro');

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
				<Text variant="overline">{t('error')}</Text>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Title id={styles.displayName} order={2}>{t('title', { name: userDisplayName })}</Title>
			<Text variant="overline">{userData?.user?.email}</Text>
			{userGender === 'female' && <Text variant="overline">{t('member_since.female', { value: new Date() })}</Text>}
			{userGender === 'male' && <Text variant="overline">{t('member_since.male', { value: new Date() })}</Text>}
			{userGender === 'other' && <Text variant="overline">{t('member_since.other', { value: new Date() })}</Text>}
		</div>
	);

	//
}
