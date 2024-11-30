'use client';

/* * */

import { AccountPayments } from '@/components/account/AccountPayments';
import { AccountProfile } from '@/components/account/AccountProfile';
import { AccountVideos } from '@/components/account/AccountVideos';
import { Loader } from '@/components/common/Loader';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function AccountMain() {
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
				if (!usersData.user) {
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
					<div className={styles.grid}>
						<AccountPayments />
						<AccountProfile />
						<AccountVideos />
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		</div>
	);

	//
}
