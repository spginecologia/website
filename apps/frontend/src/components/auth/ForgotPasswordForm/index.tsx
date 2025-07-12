'use client';

/* * */

import { ForgotPasswordDefault } from '@/payload/collections/ForgotPassword/default';
import { type ForgotPasswordRequest, type ForgotPasswordResponse } from '@/payload/collections/ForgotPassword/types';
import { ForgotPasswordValidation } from '@/payload/collections/ForgotPassword/validation';
import { validateEmail } from '@/utils/validate-email';
import { validateTaxId } from '@/utils/validate-tax-id';
import { Alert, Button, Loader, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconInfoCircle, IconUserHeart } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function ForgotPasswordForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.ForgotPasswordForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [forgotPasswordResponse, setForgotPasswordResponse] = useState<ForgotPasswordResponse | null>();

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: ForgotPasswordDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zod4Resolver(ForgotPasswordValidation),
	});

	//
	// C. Handle actions

	useEffect(() => {
		// Get pre-filled values from URL query params
		const params = new URLSearchParams(window.location.search);
		const username = params.get('username');
		if (username) form.setFieldValue('username', username);
	}, []);

	const handleFormSubmit = async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			setForgotPasswordResponse(null);
			const requestData: ForgotPasswordRequest = {
				username: form.values.username as string,
			};
			const response = await fetch('/api/auth/forgot', {
				body: JSON.stringify(requestData),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (!response.ok) throw new Error(`Failed to Check. Status: ${response.status}`);
			const responseData = await response.json();
			setIsLoading(false);
			setForgotPasswordResponse(responseData);
		}
		catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	const handleContinueToSignup = async () => {
		// Check if the username is a valid Tax ID
		const isValidTaxId = validateTaxId(String(form.values.username), false, ['singular']);
		if (isValidTaxId) return window.location.href = `/signup?tax_id=${form.values.username}`;
		// Check if the username is a valid Tax ID
		const isValidEmail = validateEmail(String(form.values.username), false);
		if (isValidEmail) return window.location.href = `/signup?email=${form.values.username}`;
		// Redirect to signup page without any parameter
		return window.location.href = '/signup';
	};

	//
	// D. Render components

	if (forgotPasswordResponse && forgotPasswordResponse.user_found && forgotPasswordResponse.has_email) {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconUserHeart />} title={t('status.has_user_has_email.alert.title')} w="100%">
					<Text size="sm">{t('status.has_user_has_email.alert.message')}</Text>
					<Space h={5} />
					<Text fw="bold" size="sm">{forgotPasswordResponse?.has_email}</Text>
					<Space h={5} />
				</Alert>
			</Paper>
		);
	}

	if (forgotPasswordResponse && forgotPasswordResponse.user_found && !forgotPasswordResponse.has_email) {
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

	if (forgotPasswordResponse && !forgotPasswordResponse.user_found) {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconInfoCircle />} title={t('status.no_user.alert.title')} w="100%">
					<Text size="sm">{t('status.no_user.alert.message')}</Text>
					<Space h={5} />
					<Button onClick={handleContinueToSignup}>{t('status.no_user.alert.action')}</Button>
				</Alert>
			</Paper>
		);
	}

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleFormSubmit)}>
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
