'use client';

/* * */

import { SignupApprovalButton } from '@/components/signup/SignupApprovalButton';
import { SignupApprovalRequest, SignupApprovalResponse } from '@/services/payload/collections/Signup/types';
import { Loader, Paper, SimpleGrid, Space, Text, Title } from '@mantine/core';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SignupApproval() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const [proponentTaxIdValue] = useQueryState('proponent_tax_id');
	const [sponsorTaxIdValue] = useQueryState('sponsor_tax_id');
	const [approvalIdValue] = useQueryState('approval_id');

	const [isLoading, setIsLoading] = useState(false);

	const [signupApprovalResponse, setSignupApprovalResponse] = useState<null | SignupApprovalResponse>();

	//
	// C. Handle actions

	const handleApprovalRequest = async (decision: SignupApprovalRequest['decision']) => {
		try {
			if (!sponsorTaxIdValue) return;
			if (!proponentTaxIdValue) return;
			if (!approvalIdValue) return;
			setIsLoading(true);
			setSignupApprovalResponse(null);
			const requestData: SignupApprovalRequest = {
				approval_id: approvalIdValue,
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
				console.log(`Failed to submit Signup Approval Request. Status: ${response.status}`);
			}
			const responseData = await response.json();
			setIsLoading(false);
			setSignupApprovalResponse(responseData);
		} catch (error) {
			console.log(error.message);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			if (!sponsorTaxIdValue) return;
			if (!proponentTaxIdValue) return;
			if (!approvalIdValue) return;
			await handleApprovalRequest('status_request');
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sponsorTaxIdValue, proponentTaxIdValue, approvalIdValue]);

	//
	// D. Render components

	if (isLoading) {
		return (
			<Paper className={styles.container}>
				<Loader />
			</Paper>
		);
	}

	if (signupApprovalResponse?.status === 'waiting') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('auth.SignupApproval.status.waiting.title')}</Title>
				<Text size="sm">{t('auth.SignupApproval.status.waiting.message', { proponent_display_name: signupApprovalResponse.proponent_display_name })}</Text>
				<Space h={5} />
				<Text size="sm">{t('auth.SignupApproval.proponent_details.display_name', { value: signupApprovalResponse.proponent_display_name })}</Text>
				<Text size="sm">{t('auth.SignupApproval.proponent_details.workplace_primary', { value: signupApprovalResponse.proponent_workplace_primary || 'N/A' })}</Text>
				<Space h={5} />
				<SimpleGrid cols={2} w="100%">
					<SignupApprovalButton decision="approve" onClick={() => handleApprovalRequest('approve')} />
					<SignupApprovalButton decision="reject" onClick={() => handleApprovalRequest('reject')} />
				</SimpleGrid>
				<Space h={5} />
				<Text variant="footnote">{t('auth.SignupApproval.status.waiting.footnote')}</Text>
			</Paper>
		);
	}

	if (signupApprovalResponse?.status === 'user_active') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('auth.SignupApproval.status.user_active.title')}</Title>
				<Text size="sm">{t('auth.SignupApproval.status.user_active.message')}</Text>
				<Space h={5} />
				<Text c="var(--color-state-success)" size="xs" variant="overline">{t('auth.SignupApproval.status.user_active.overline')}</Text>
			</Paper>
		);
	}

	if (signupApprovalResponse?.status === 'sponsor_approved') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('auth.SignupApproval.status.sponsor_approved.title')}</Title>
				<Text size="sm">{t('auth.SignupApproval.status.sponsor_approved.message')}</Text>
				<Space h={5} />
				<Text c="var(--color-brand-primary-200)" size="xs" variant="overline">{t('auth.SignupApproval.status.sponsor_approved.overline')}</Text>
			</Paper>
		);
	}

	if (signupApprovalResponse?.status === 'sponsor_rejected') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('auth.SignupApproval.status.sponsor_rejected.title')}</Title>
				<Text size="sm">{t('auth.SignupApproval.status.sponsor_rejected.message')}</Text>
				<Space h={5} />
				<Text size="xs" variant="overline">{t('auth.SignupApproval.status.sponsor_rejected.overline')}</Text>
			</Paper>
		);
	}

	return (
		<Paper className={styles.container}>
			<Title order={2}>{t('auth.SignupApproval.status.expired.title')}</Title>
			<Text size="sm">{t('auth.SignupApproval.status.expired.message')}</Text>
			<Text variant="footnote">{t('auth.SignupApproval.status.expired.footnote')}</Text>
		</Paper>
	);

	//
}
