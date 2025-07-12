'use client';

/* * */

import { AccountIntro } from '@/src/components/account/AccountIntro';
import { AccountLogoutButton } from '@/src/components/account/AccountLogoutButton';
import { AccountPayments } from '@/src/components/account/AccountPayments';
import { AccountProfile } from '@/src/components/account/AccountProfile';
import { AccountVideos } from '@/src/components/account/AccountVideos';
import { ContentWrapper } from '@/src/components/common/ContentWrapper';
import { Section } from '@/src/components/common/Section';
import { type PayloadMeResponse } from '@/src/types/payload-api-response';
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
		if (!userData || !userData.user) {
			window.location.replace('/login');
		}
	}, [userData, userLoading]);

	//
	// C. Render components

	return (
		<ContentWrapper variant="support">
			<Section withTopSpacer="transparent">
				<AccountIntro />
			</Section>
			<Section>
				<div className={styles.grid}>
					<div className={styles.columnA}>
						<AccountPayments />
						<AccountVideos />
					</div>
					<div className={styles.columnB}>
						<AccountProfile />
					</div>
				</div>
			</Section>
			<Section>
				<AccountLogoutButton />
			</Section>
		</ContentWrapper>
	);

	//
}
