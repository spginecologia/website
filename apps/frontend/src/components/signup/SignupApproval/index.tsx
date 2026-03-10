'use client';

/* * */

import { SignupApprovalRequest, SignupApprovalResponse } from '@/services/payload/collections/Signup/types';
import { Loader, Paper, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

import { SignupApprovalButton } from '../SignupApprovalButton';

/* * */

export function SignupApproval() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const [proponentTaxIdValue] = useQueryState('proponent_tax_id');
	const [sponsorTaxIdValue] = useQueryState('sponsor_tax_id');
	const [sponsorUserIdValue] = useQueryState('sponsor_user_id');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [signupApprovalResponse, setSignupApprovalResponse] = useState<null | SignupApprovalResponse>();

	//
	// C. Handle actions

	const handleApprovalRequest = async (decision: SignupApprovalRequest['decision']) => {
		try {
			if (!sponsorTaxIdValue) return;
			if (!proponentTaxIdValue) return;
			if (!sponsorUserIdValue) return;
			setIsLoading(true);
			setIsError(false);
			setSignupApprovalResponse(null);
			const requestData: SignupApprovalRequest = {
				approval_id: sponsorUserIdValue,
				decision,
				proponent_tax_id: proponentTaxIdValue,
				sponsor_tax_id: sponsorTaxIdValue,
			};
			const response = await fetch('/api/auth/signup-approval', {
				body: JSON.stringify(requestData),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (!response.ok) {
				setIsLoading(false);
				setIsError(true);
				console.log(`Failed to submit Signup Approval Request. Status: ${response.status}`);
			}
			const responseData = await response.json();
			setIsLoading(false);
			setSignupApprovalResponse(responseData);
		} catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	useEffect(() => {
		(async () => {
			if (!sponsorTaxIdValue) return;
			if (!proponentTaxIdValue) return;
			if (!sponsorUserIdValue) return;
			await handleApprovalRequest('status_request');
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sponsorTaxIdValue, proponentTaxIdValue, sponsorUserIdValue]);

	//
	// D. Render components

	return (
		<Paper className={styles.container}>

			<Title order={2}>{t('auth.SignupApproval.title')}</Title>
			<Text size="sm">{t('auth.SignupApproval.subtitle')}</Text>

			<Space h={5} />

			<SimpleGrid cols={2} w="100%">
				<SignupApprovalButton decision="approve" onClick={() => handleApprovalRequest('approve')} />
				<SignupApprovalButton decision="reject" onClick={() => handleApprovalRequest('reject')} />
			</SimpleGrid>

			<Space h={5} />

			{isLoading && <Loader />}

			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('auth.SignupApproval.error.message')}</Text>
				</>
			)}

		</Paper>
	);

	//
}
