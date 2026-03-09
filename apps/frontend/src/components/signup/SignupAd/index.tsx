'use client';

/* * */

import { Button, Image, Space, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SignupAd() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Image className={styles.image} src="/generic/auth-login.svg" />
			<Title id={styles.title} order={2}>{t('auth.SignupAd.title')}</Title>
			<Text>{t('auth.SignupAd.paragraph_1')}</Text>
			<Text>{t('auth.SignupAd.paragraph_2')}</Text>
			<Space h="xs" />
			<Button component={Link} href="/forgot">{t('auth.SignupAd.signup')}</Button>
		</div>
	);

	//
}
