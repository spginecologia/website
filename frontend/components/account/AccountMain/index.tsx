'use client';

/* * */

import { AccountPayments } from '@/components/account/AccountPayments';
import { AccountProfile } from '@/components/account/AccountProfile';
import { AccountVideos } from '@/components/account/AccountVideos';
import FrontendSection from '@/components/FrontendSection/FrontendSection';
import FrontendWrapperInner from '@/components/FrontendWrapperInner/FrontendWrapperInner';
import { Skeleton } from '@mantine/core';
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
				<FrontendWrapperInner>
					<FrontendSection first>
						<div className={styles.grid}>
							<Skeleton h={200} w="100%" />
							<Skeleton h={200} w="100%" />
							<Skeleton h={200} w="100%" />
						</div>
					</FrontendSection>
				</FrontendWrapperInner>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<FrontendWrapperInner>
				<FrontendSection first>
					<div className={styles.grid}>
						<AccountPayments />
						<AccountVideos />
						<AccountProfile />
					</div>
				</FrontendSection>
			</FrontendWrapperInner>
		</div>
	);

	//
}
