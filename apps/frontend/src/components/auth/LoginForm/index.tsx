'use client';

/* * */

import { navigationHandleRedirectParam } from '@/services/navigation/navigation-handle-redirect-param';
import { LoginDefault } from '@/services/payload/collections/Login/default';
import { LoginValidation } from '@/services/payload/collections/Login/validation';
import { Anchor, Button, Loader, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function LoginForm() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

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
		validate: zod4Resolver(LoginValidation),
	});

	//
	// C. Handle actions

	const handleLogin = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/auth/login', {
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
			navigationHandleRedirectParam('/account');
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

			<Title order={2}>{t('auth.LoginForm.title')}</Title>

			<Space h={5} />

			<TextInput disabled={isLoading} label={t('auth.LoginForm.username.label')} placeholder={t('auth.LoginForm.username.placeholder')} w="100%" {...form.getInputProps('username')} />
			<TextInput disabled={isLoading} label={t('auth.LoginForm.password.label')}placeholder={t('auth.LoginForm.password.placeholder')} type="password" w="100%" {...form.getInputProps('password')} />

			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('auth.LoginForm.submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('auth.LoginForm.error.message')}</Text>
				</>
			)}

			<Space h={5} />
			<Anchor href={`/forgot?username=${form.values.username}`} id={styles.anchor} variant="link">{t('auth.LoginForm.reset_password')}</Anchor>

		</Paper>
	);

	//
}
