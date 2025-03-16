'use client';

/* * */

import { ForgotPasswordDefault } from '@/payload/collections/ForgotPassword/default';
import { type ForgotPasswordRequest, type ForgotPasswordResponse } from '@/payload/collections/ForgotPassword/types';
import { ForgotPasswordValidation } from '@/payload/collections/ForgotPassword/validation';
import { Alert, Button, Loader, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconInfoCircle, IconUserHeart } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function ForgotPasswordForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.ForgotPasswordForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [checkResult, setCheckResult] = useState<ForgotPasswordResponse | null>();

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: ForgotPasswordDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zodResolver(ForgotPasswordValidation),
	});

	//
	// C. Handle actions

	const handleForgotPasswordname = async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			setCheckResult(null);
			const requestData: ForgotPasswordRequest = {
				username: form.values.username,
			};
			const response = await fetch('/api/auth/forgot', {
				body: JSON.stringify(requestData),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (!response.ok) throw new Error(`Failed to Check. Status: ${response.status}`);
			const responseData = await response.json();
			setIsLoading(false);
			setCheckResult(responseData);
		}
		catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	const handleApplyRequest = async () => {
		window.location.href = `/signup?username=${form.values.username}`;
	};

	//
	// D. Render components

	if (checkResult && checkResult.user_found && checkResult.has_email) {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconUserHeart />} title={t('status.has_user_has_email.alert.title')} w="100%">
					<Text size="sm">{t('status.has_user_has_email.alert.message')}</Text>
					<Space h={5} />
					<Text fw="bold" size="sm">{checkResult?.has_email}</Text>
					<Space h={5} />
				</Alert>
			</Paper>
		);
	}

	if (checkResult && checkResult.user_found && !checkResult.has_email) {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconUserHeart />} title={t('status.has_user_no_email.alert.title')} w="100%">
					<Text size="sm">{t('status.has_user_no_email.alert.message')}</Text>
					<Space h={5} />
					<Text fw="bold" size="xs">+351 218 429 710</Text>
					<Text fw="bold" size="xs">secretariado@spginecologia.pt</Text>
					<Space h={5} />
				</Alert>
			</Paper>
		);
	}

	if (checkResult && !checkResult.user_found) {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconInfoCircle />} title={t('status.no_user.alert.title')} w="100%">
					<Text size="sm">{t('status.no_user.alert.message')}</Text>
					<Space h={5} />
					<Button onClick={handleApplyRequest}>{t('status.no_user.alert.action')}</Button>
				</Alert>
			</Paper>
		);
	}

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleForgotPasswordname)}>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h={5} />
			<TextInput disabled={isLoading} label={t('fields.username.label')} placeholder={t('fields.username.placeholder')} w="100%" {...form.getInputProps('username')} />
			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('error.message')}</Text>
				</>
			)}
		</Paper>
	);

	//
}
