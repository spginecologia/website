'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { IconUserCircle } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function HeaderUser() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.HeaderUser');

	//
	// B. Fetch data

	const { data: userData, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Render components

	if (userLoading) {
		return (
			<div className={styles.container}>
				<Loader size={20} full visible />
			</div>
		);
	}

	if (!userData || !userData.user) {
		return (
			<>
				<div className={styles.container} data-desktop>
					<Link className={styles.login} href="/login">
						<span className={styles.userFirstName}>{t('login.label')}</span>
					</Link>
				</div>
				<div className={styles.container} data-mobile={true}>
					<Link className={styles.login} href="/login">
						<IconUserCircle size={35} />
					</Link>
				</div>
			</>
		);
	}

	if (userData && userData.user) {
		return (
			<>
				<div className={styles.container} data-desktop>
					<Link className={styles.target} href="/account">
						{userData.user.title && <span className={styles.userTitle}>{userData.user.title}</span>}
						{userData.user.first_name && <span className={styles.userFirstName}>{userData.user.first_name.substring(0, 12)}</span>}
					</Link>
				</div>
				<div className={styles.container} data-mobile>
					<Link className={styles.login} href="/login">
						<IconUserCircle size={35} />
					</Link>
				</div>
			</>
		);
	}

	//
}
