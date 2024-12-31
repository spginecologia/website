'use client';

/* * */

import { LoginForm } from '@/components/auth/LoginForm';
import { LoginSignupAd } from '@/components/auth/LoginSignupAd';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { Skeleton } from '@mantine/core';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function LoginMain() {
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
			<ContentWrapper className={styles.contentWrapperOverride}>
				<Section topSpacerType="transparent">
					<div className={styles.grid}>
						<Skeleton height={350} />
						<LoginSignupAd />
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper className={styles.contentWrapperOverride}>
			<Section topSpacerType="transparent">
				<div className={styles.grid}>
					<LoginForm />
					<LoginSignupAd />
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
