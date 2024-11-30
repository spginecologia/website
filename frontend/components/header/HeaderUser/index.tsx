'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import { IconSettings, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

const PROFILE_PAGES = [
	{ icon: <IconUserCircle size={24} />, key: 'account', path: '/account' },
	{ icon: <IconSettings size={24} />, key: 'admin', path: '/admin' },
];

/* * */

export function HeaderUser() {
	//

	//
	// A. Setup variables

	const t = useTranslations('header.HeaderUser');

	//
	// B. Fetch data

	const { data: userData, isLoading: userLoading } = useSWR('/api/users/me');

	//
	// C. Render components

	if (userLoading) {
		return (
			<div className={styles.container}>
				<Loader size={20} full visible />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{(!userData || !userData.user) && (
				<Link className={styles.login} href="/login">
					<span className={styles.userFirstName}>{t('login.label')}</span>
				</Link>
			)}
			{userData && userData.user && (
				<>
					<Link className={styles.target} href="/account">
						{userData.user.title && <span className={styles.userTitle}>{userData.user.title}</span>}
						{userData.user.name && <span className={styles.userFirstName}>{userData.user.name.substring(0, 12)}</span>}
					</Link>
					<div className={styles.dropdown}>
						{PROFILE_PAGES.map(item => (
							<Link key={item.key} className={styles.dropdownLink} href={item.path}>
								<span className={styles.dropdownLinkIcon}>{item.icon}</span>
								<span className={styles.dropdownLinkLabel}>{t(`${item.key}.label`)}</span>
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);

	//
}
