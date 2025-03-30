'use client';

/* * */

import { Image, Space, Text, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function SignupGuide() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.SignupGuide');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Image className={styles.image} src="/generic/auth-login.svg" />
			<Title id={styles.title} order={2}>{t('title')}</Title>
			<Text>{t('paragraph_1')}</Text>
			<Text>{t('paragraph_2')}</Text>
			<Space h="xs" />
		</div>
	);

	//
}
