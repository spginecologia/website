'use client';

/* * */

import { LoginDefault } from '@/payload/collections/Login/default';
import { LoginValidation } from '@/payload/collections/Login/validation';
import { navigationHandleRedirectParam } from '@/utils/navigation-handle-redirect-param';
import { Anchor, Button, Loader, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function LoginForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.LoginForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: LoginDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zodResolver(LoginValidation),
	});

	//
	// C. Handle actions

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/account/login', {
				body: JSON.stringify({
					password: form.values.password,
					username: form.values.username,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(`Failed to login. Status: ${response.status}`);
			}
			console.log('Login successful. Redirecting to account page...');
			navigationHandleRedirectParam({ fallback: '/account' });
		}
		catch (error) {
			console.log(error.message);
			form.setFieldValue('password', '');
			setIsLoading(false);
			setIsError(true);
		}
	};

	//
	// D. Render components

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleLogin)}>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h={5} />
			<TextInput disabled={isLoading} label={t('username.label')} placeholder={t('username.placeholder')} w="100%" {...form.getInputProps('username')} />
			<TextInput disabled={isLoading} label={t('password.label')}placeholder={t('password.placeholder')} type="password" w="100%" {...form.getInputProps('password')} />
			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('error.message')}</Text>
				</>
			)}
			<Space h={5} />
			<Anchor href="/login/forgot" id={styles.resetPassword} variant="link">{t('reset_password.label')}</Anchor>
		</Paper>
	);
}
