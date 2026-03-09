'use client';

/* * */

import { Image, Space, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SignupGuide() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<Image className={styles.image} src="/generic/auth-login.svg" />
			<Title id={styles.title} order={2}>{t('auth.SignupGuide.title')}</Title>
			<Text>{t('auth.SignupGuide.paragraph_1')}</Text>
			<Text>{t('auth.SignupGuide.paragraph_2')}</Text>
			<Space h="xs" />
		</div>
	);

	//
}
