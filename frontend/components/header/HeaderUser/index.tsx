'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import { User } from '@/payload-types';
import { IconSettings, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

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

	const [isLoading, setIsLoading] = useState(true);
	const [loggedInUserData, setLoggedInUserData] = useState<undefined | User>();

	//
	// B. Fetch data

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const response = await fetch('/api/users/me');
				const data = await response.json();
				if (data.user) {
					setLoggedInUserData(data.user);
					console.log(data);
				}
			}
			catch (error) {
				console.error(error);
			}
			finally {
				setIsLoading(false);
			}
		})();
	}, []);

	//
	// C. Render components

	if (isLoading) {
		return (
			<div className={styles.container}>
				<Loader size={20} full visible />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{!loggedInUserData && (
				<Link className={styles.login} href="/login">
					<span className={styles.userFirstName}>{t('login.label')}</span>
				</Link>
			)}
			{loggedInUserData && (
				<>
					<Link className={styles.target} href="/account">
						{loggedInUserData.title && <span className={styles.userTitle}>{loggedInUserData.title}</span>}
						{loggedInUserData.name && <span className={styles.userFirstName}>{loggedInUserData.name.substring(0, 12)}</span>}
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
