'use client';

/* * */

import { AccountPayments } from '@/components/account/AccountPayments';
import { AccountProfile } from '@/components/account/AccountProfile';
import { AccountVideos } from '@/components/account/AccountVideos';
import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { PayloadMeResponse } from '@/types/payload-api-response';
import { Skeleton } from '@mantine/core';
import { useEffect } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

export function AccountMain() {
	//

	//
	// A. Fetch data

	const { data: userData, isLoading: userLoading } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// B. Handle actions

	useEffect(() => {
		if (userLoading) return;
		if (!userData || !userData.user) window.location.replace('/login');
	}, [userData, userLoading]);

	//
	// C. Render components

	if (userLoading) {
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
