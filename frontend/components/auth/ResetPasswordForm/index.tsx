'use client';

/* * */

import { ResetPasswordDefault } from '@/payload/collections/ResetPassword/default';
import { ResetPasswordValidation } from '@/payload/collections/ResetPassword/validation';
import { Alert, Button, Loader, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconMailFast } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function ResetPasswordForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.ResetPasswordForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: ResetPasswordDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zodResolver(ResetPasswordValidation),
	});

	//
	// C. Handle actions

	const handleResetPassword = async () => {
		try {
			setIsLoading(true);
			setIsSuccess(false);
			setIsError(false);
			const response = await fetch('/api/users/forgot-password', {
				body: JSON.stringify({
					email: form.values.email,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(`Failed to reset password. Status: ${response.status}`);
			}
			console.log('Reset password successful!');
			setIsLoading(false);
			setIsSuccess(true);
		}
		catch (error) {
			console.log(error.message);
			form.setFieldValue('password', '');
			setIsLoading(false);
			setIsSuccess(false);
			setIsError(true);
		}
	};

	//
	// D. Render components

	if (isSuccess) {
		return (
			<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleResetPassword)}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconMailFast />} title={t('success.title')} w="100%">
					<Text size="sm">{t('success.message')}</Text>
				</Alert>
			</Paper>
		);
	}

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleResetPassword)}>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h={5} />
			<TextInput disabled={isLoading} label={t('email.label')} placeholder={t('email.placeholder')} w="100%" {...form.getInputProps('email')} />
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
