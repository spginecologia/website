'use client';

/* * */

import { ContentWrapper } from '@/components/common/ContentWrapper';
import { Section } from '@/components/common/Section';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Skeleton } from '@mantine/core';
import { useEffect } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	sidebar?: React.ReactNode
}

/* * */

export function AuthWrapper({ children, sidebar }: Props) {
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
					{sidebar}
				</div>
			</Section>
		</ContentWrapper>
	);

	//
}
