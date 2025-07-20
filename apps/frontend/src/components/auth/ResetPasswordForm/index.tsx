'use client';

/* * */

import { navigationHandleRedirectParam } from '@/services/navigation/navigation-handle-redirect-param';
import { ResetPasswordDefault } from '@/services/payload/collections/ResetPassword/default';
import { ResetPasswordValidation } from '@/services/payload/collections/ResetPassword/validation';
import { Button, Loader, Paper, PasswordInput, Space, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function ResetPasswordForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.ResetPasswordForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [passwordVisible, setPasswordVisibility] = useState(false);

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
	// C. Transform data

	const resetToken = useMemo(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');
		if (!token) window.location.replace('/forgot');
		return token;
	}, []);

	//
	// D. Handle actions

	const handleResetPassword = async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			const response = await fetch('/api/auth/reset', {
				body: JSON.stringify({
					password: form.values.password,
					password_confirmation: form.values.password_confirmation,
					token: resetToken,
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

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleResetPassword)}>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h={5} />
			<PasswordInput
				disabled={isLoading}
				label={t('password.label')}
				onVisibilityChange={() => setPasswordVisibility(prev => !prev)}
				placeholder={t('password.placeholder')}
				visible={passwordVisible}
				w="100%"
				{...form.getInputProps('password')}
			/>
			<PasswordInput
				disabled={isLoading}
				label={t('password_confirmation.label')}
				onVisibilityChange={() => setPasswordVisibility(prev => !prev)}
				placeholder={t('password_confirmation.placeholder')}
				visible={passwordVisible}
				w="100%"
				{...form.getInputProps('password_confirmation')}
			/>
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
}
