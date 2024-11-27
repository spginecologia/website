'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import Section from '@/components/FrontendSection/FrontendSection';
import Panel from '@/components/Panel/Panel';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function AuthWrapper({ children }) {
	//

	//
	// A. Setup variables

	const [isLoading, setIsLoading] = useState(true);

	//
	// B. Handle actions

	useEffect(() => {
		const checkAuthStatusTimeout = setTimeout(async () => {
			try {
				console.log('here');
				setIsLoading(true);
				// Search for users data
				const usersResponse = await fetch('/api/users/me');
				const usersData = await usersResponse.json();
				if (usersData.user) {
					window.location.replace('/account');
				}
				// Search for admins data
				const adminsResponse = await fetch('/api/admins/me');
				const adminsData = await adminsResponse.json();
				if (adminsData.user) {
					window.location.replace('/account');
				}
			}
			catch (error) {
				console.error(error);
			}
			finally {
				setIsLoading(false);
			}
		}, 500);
		return () => clearTimeout(checkAuthStatusTimeout);
	}, []);

	//
	// C. Render components

	if (isLoading) {
		return (
			<div className={styles.container}>
				<Loader fixed visible />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Section first>
				<div className={styles.grid}>
					<Panel>{children}</Panel>
					<div className={styles.advert} />
				</div>
			</Section>
		</div>
	);

	//
}
