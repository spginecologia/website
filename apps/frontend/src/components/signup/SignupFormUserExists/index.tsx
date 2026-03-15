'use client';

/* * */

import { Alert, Button, Paper, Space, Text, Title } from '@mantine/core';
import { IconUserHeart } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SignupFormUserExists() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<Paper className={styles.container}>
			<Title order={2}>{t('auth.SignupForm.title')}</Title>
			<Space h={5} />
			<Alert icon={<IconUserHeart />} title={t('auth.SignupForm.status.user_exists.alert.title')} w="100%">
				<Text size="sm">{t('auth.SignupForm.status.user_exists.alert.message')}</Text>
				<Space h={5} />
				<Button component={Link} href="/forgot">{t('auth.SignupForm.status.user_exists.alert.action')}</Button>
				<Space h={5} />
			</Alert>
		</Paper>
	);
}
