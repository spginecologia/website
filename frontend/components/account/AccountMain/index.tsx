'use client';

/* * */

import { AccountPayments } from '@/components/account/AccountPayments';
import { AccountProfile } from '@/components/account/AccountProfile';
import { AccountVideos } from '@/components/account/AccountVideos';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
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
			<ContentWrapper className={styles.contentWrapperOverride}>
				<Section topSpacerType="transparent">
					<div className={styles.grid}>
						<Skeleton h={200} w="100%" />
						<Skeleton h={200} w="100%" />
						<Skeleton h={200} w="100%" />
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper className={styles.contentWrapperOverride}>
			<Section topSpacerType="transparent">
				<div className={styles.grid}>
					<AccountPayments />
					<AccountVideos />
					<AccountProfile />
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
