'use client';

/* * */

import { AuthSignupAd } from '@/components/auth/AuthSignupAd';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Skeleton } from '@mantine/core';
import { useEffect } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AuthWrapper({ children }) {
	//

	//
	// A. Fetch data

	const { data: userData, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// B. Handle actions

	useEffect(() => {
		if (userLoading) return;
		if (userData && userData.user) {
			window.location.replace('/account');
		}
	}, [userData, userLoading]);

	//
	// C. Render components

	if (userLoading) {
		return (
			<ContentWrapper className={styles.contentWrapperOverride}>
				<Section withTopSpacer="transparent">
					<div className={styles.grid}>
						<Skeleton height={350} />
						<div />
					</div>
				</Section>
			</ContentWrapper>
		);
	}

	return (
		<ContentWrapper className={styles.contentWrapperOverride}>
			<Section withTopSpacer="transparent">
				<div className={styles.grid}>
					{children}
					<AuthSignupAd />
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
