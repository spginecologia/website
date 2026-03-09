'use client';

/* * */

import { Alert, Paper, Space, Text, Title } from '@mantine/core';
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SignupFormUserCreated() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<Paper className={styles.container}>
			<Title order={2}>{t('auth.SignupForm.title')}</Title>
			<Text>{t('auth.SignupForm.subtitle')}</Text>
			<Space h={5} />
			<Alert icon={<IconRosetteDiscountCheckFilled />} title={t('auth.SignupForm.status.user_created.alert.title')} w="100%">
				<Text size="sm">{t('auth.SignupForm.status.user_created.alert.message')}</Text>
				<Space h={5} />
				<Text fw="bold" size="xs">+351 218 429 710</Text>
				<Text fw="bold" size="xs">secretariado@spginecologia.pt</Text>
				<Space h={5} />
			</Alert>
		</Paper>
	);
}
