'use client';

/* * */

import { navigationHandleRedirectParam } from '@/services/navigation/navigation-handle-redirect-param';
import { ResetPasswordDefault } from '@/services/payload/collections/ResetPassword/default';
import { ResetPasswordValidation } from '@/services/payload/collections/ResetPassword/validation';
import { Button, Loader, Paper, PasswordInput, Space, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function ResetPasswordForm() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [passwordVisible, setPasswordVisibility] = useState(false);

	const [tokenValue] = useQueryState('token');

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: ResetPasswordDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zod4Resolver(ResetPasswordValidation),
	});

	//
	// D. Handle actions

	useEffect(() => {
		// Skip if token is present
		if (tokenValue) return;
		// Set timeout of 15 seconds to redirect user
		// if token is not present in query params
		const timeout = setTimeout(() => {
			if (!tokenValue) window.location.replace('/forgot');
		}, 15_000);
		return () => clearTimeout(timeout);
	}, [tokenValue]);

	const handleResetPassword = async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			const response = await fetch('/api/auth/reset', {
				body: JSON.stringify({
					password: form.values.password,
					password_confirmation: form.values.password_confirmation,
					token: tokenValue,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(`Failed to reset password. Status: ${response.status}`);
			}
			navigationHandleRedirectParam('/account');
		}
		catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	//
	// E. Render components

	if (!tokenValue) {
		return (
			<Paper className={styles.container}>
				<Loader />
			</Paper>
		);
	}

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleResetPassword)}>
			<Title order={2}>{t('auth.ResetPasswordForm.title')}</Title>
			<Text>{t('auth.ResetPasswordForm.subtitle')}</Text>
			<Space h={5} />
			<PasswordInput
				disabled={isLoading}
				label={t('auth.ResetPasswordForm.password.label')}
				onVisibilityChange={() => setPasswordVisibility(prev => !prev)}
				placeholder={t('auth.ResetPasswordForm.password.placeholder')}
				visible={passwordVisible}
				w="100%"
				{...form.getInputProps('password')}
			/>
			<PasswordInput
				disabled={isLoading}
				label={t('auth.ResetPasswordForm.password_confirmation.label')}
				onVisibilityChange={() => setPasswordVisibility(prev => !prev)}
				placeholder={t('auth.ResetPasswordForm.password_confirmation.placeholder')}
				visible={passwordVisible}
				w="100%"
				{...form.getInputProps('password_confirmation')}
			/>
			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('auth.ResetPasswordForm.submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('auth.ResetPasswordForm.error.message')}</Text>
				</>
			)}
		</Paper>
	);
}
