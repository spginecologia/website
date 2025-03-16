'use client';

/* * */

import { ForgotPasswordDefault } from '@/payload/collections/ForgotPassword/default';
import { ForgotPasswordValidation } from '@/payload/collections/ForgotPassword/validation';
import { navigationGetRedirectParam } from '@/utils/navigation-handle-redirect-param';
import { Alert, Anchor, Button, Loader, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconMailFast } from '@tabler/icons-react';
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
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

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

	useEffect(() => {
		if (typeof window === 'undefined') return;
		const username = new URLSearchParams(window.location.search).get('username');
		if (username) form.setFieldValue('username', username);
	}, []);

	const handleForgotPassword = async () => {
		try {
			setIsLoading(true);
			setIsSuccess(false);
			setIsError(false);
			const response = await fetch('/api/auth/forgot', {
				body: JSON.stringify({
					redirect: navigationGetRedirectParam(),
					username: form.values.username,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(`Failed to forgot password. Status: ${response.status}`);
			}
			console.log('Forgot password successful!');
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
			<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleForgotPassword)}>
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
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleForgotPassword)}>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h={5} />
			<TextInput disabled={isLoading} label={t('username.label')} placeholder={t('username.placeholder')} w="100%" {...form.getInputProps('username')} />
			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('error.message')}</Text>
				</>
			)}
			<Space h={5} />
			<Anchor href="/login" id={styles.anchor} variant="link">{t('back_to_login')}</Anchor>
		</Paper>
	);
}
