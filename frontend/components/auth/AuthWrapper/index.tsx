'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import Section from '@/components/FrontendSection/FrontendSection';
import { Paper } from '@mantine/core';
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
				setIsLoading(true);
				// Search for users data
				const usersResponse = await fetch('/api/users/me');
				const usersData = await usersResponse.json();
				if (usersData.user) {
					window.location.replace('/account');
				}
				setIsLoading(false);
			}
			catch (error) {
				console.error(error);
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
					<Paper>{children}</Paper>
					<div className={styles.advert} />
				</div>
			</Section>
		</div>
	);

	//
}
