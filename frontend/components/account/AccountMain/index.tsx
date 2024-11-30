'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function AccountMain({ children }) {
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
				// Search for admins data
				const adminsResponse = await fetch('/api/admins/me');
				const adminsData = await adminsResponse.json();
				if (!usersData.user && !adminsData.user) {
					window.location.replace('/login');
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
			<FrontendWrapperInner>
				<FrontendSection first>
					<div className={styles.grid}>{children}</div>
				</FrontendSection>
			</FrontendWrapperInner>
		</div>
	);

	//
}
