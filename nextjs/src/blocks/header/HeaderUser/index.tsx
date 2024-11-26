'use client';

/* * */

import { fetchUser } from '@/functions/fetchUser';
import { User } from '@/payload-types';
import { IconSettings, IconUserCircle } from '@tabler/icons-react';
import Link from 'next/link';
import nookies from 'nookies';
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

	const cookies = nookies.get();
	const token = cookies.authToken;

	const [user, setUser] = useState<undefined | User>(undefined);
	const [loggedIn, setLoggedIn] = useState(token ?? false);

	const handleFetchUser = async () => {
		if (token) {
			const user = await fetchUser();
			setUser(user?.user);
		}
	};

	useEffect(() => {
		handleFetchUser();
	}, []);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			{!loggedIn && (
				<Link className={styles.login} href="/login">
					<span className={styles.userFirstName}>isjdis</span>
					{/* <span className={styles.userFirstName}>{t('login.label')}</span> */}
				</Link>
			)}
			{loggedIn && (
				<>
					<Link className={styles.target} href="/account">
						{!loggedIn ? 'Login' : `${user?.title} ${user?.name}`}
					</Link>
					<div className={styles.dropdown}>
						{PROFILE_PAGES.map(item => (
							<Link key={item.key} className={styles.dropdownLink} href={item.path}>
								<span className={styles.dropdownLinkIcon}>{item.icon}</span>
								{/* <span className={styles.dropdownLinkLabel}>{t(`${item.key}.label`)}</span> */}
							</Link>
						))}
					</div>
				</>
			)}
		</div>
	);

	//
}
