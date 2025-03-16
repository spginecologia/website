'use client';

/* * */

import { type PayloadMeResponse } from '@/types/payload-api-response';

import { Button, Image, Skeleton, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {

	/**
	 * The children to render if the user has the required permission.
	 */
	children: React.ReactNode

	/**
	 * If true, the "wall" message will not be rendered.
	 */
	invisible?: boolean

	/**
	 * If the user should be redirected to login.
	 * Optionally add a URL to redirect to if the user does not have the required permission.
	 */
	redirect?: boolean | string

}

export function AuthWall({ children, invisible, redirect }: Props) {
	//

	//
	// A. Setup variables

	const router = useRouter();
	const t = useTranslations('auth.AuthWall');

	//
	// B. Fetch data

	const { data: userData, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Handle actions

	useEffect(() => {
		if (userLoading) return;
		if ((!userData || !userData.user) && redirect) {
			if (typeof redirect === 'boolean') {
				router.replace('/login');
			}
			else if (typeof redirect === 'string') {
				router.replace(redirect);
			}
		}
	}, [userData, userLoading]);

	//
	// D. Render components

	if (invisible && (userLoading || !userData || !userData.user)) {
		return <></>;
	}

	if (userLoading && !invisible) {
		return <Skeleton h={200} w={400} />;
	}

	if (userData && userData.user) {
		return children;
	}

	return (
		<div className={styles.container}>
			<div className={styles.wallWrapper}>
				<div className={styles.header}>
					<Image className={styles.headerLogo} src="/brand/academia/spg-academia-logo-white.svg" />
				</div>
				<div className={styles.content}>
					<Text ta="center">{t('message')}</Text>
					<Button component={Link} href={`/login?redirect=${window.location.pathname}`} w="100%">{t('action_login')}</Button>
					<Button component={Link} href={`/signup?verify=true&redirect=${window.location.pathname}`} w="100%">{t('action_verify')}</Button>
					<Button component={Link} href={`/signup?redirect=${window.location.pathname}`} w="100%">{t('action_signup')}</Button>
				</div>
			</div>
		</div>
	);

	//
}
