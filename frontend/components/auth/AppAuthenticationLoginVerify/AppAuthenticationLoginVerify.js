'use client';

/* * */

import Button from '@/components/common/Button';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { Space } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import styles from './AppAuthenticationLoginVerify.module.css';

/* * */

export default function AppAuthenticationLoginVerify() {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('AppAuthenticationLoginVerify');

	//
	// B. Handle actions

	const handleSignInRetry = () => {
		router.push('/login');
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Title level="h2" text={t('title')} />
			<Text text={t('subtitle')} />
			<Space />
			<Button label={t('retry')} onClick={handleSignInRetry} variant="muted" />
		</div>
	);

	//
}
