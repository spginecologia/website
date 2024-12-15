'use client';

/* * */

import { Loader } from '@/components/common/Loader';
import { SignInDefault } from '@/schemas/SignIn/default';
import { SignInValidation } from '@/schemas/SignIn/validation';
import { Button, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
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
		initialValues: SignInDefault,
		validate: yupResolver(SignInValidation),
	});

	//
	// C. Handle actions

	const handleSignIn = async () => {
		try {
			setIsLoading(true);
			const loginResponse = await fetch('/api/users/login', {
				body: JSON.stringify({
					email: form.values.email,
					password: form.values.password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			const loginData = await loginResponse.json();
			if (loginData.user) {
				console.log('Login successful. Redirecting to account page...');
				window.location.replace('/account');
			}
			else {
				console.log('Login failed. Please try again.');
				setIsLoading(false);
				setIsError(true);
			}
		}
		catch (error) {
			console.error(error);
			setIsLoading(false);
			setIsError(true);
		}
	};

	const handleRetry = () => {
		window.location.reload();
	};

	//
	// D. Render components

	if (isError) {
		return (
			<div className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<p className={styles.errorMessage}>{t('error.message')}</p>
				<Space />
				<Button onClick={handleRetry}>{t('error.retry')}</Button>
			</div>
		);
	}

	return (
		<form className={styles.container} onSubmit={form.onSubmit(handleSignIn)}>
			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>
			<Space h={5} />
			<TextInput disabled={isLoading} label={t('email.label')} placeholder={t('email.placeholder')} type="email" {...form.getInputProps('email')} />
			<TextInput disabled={isLoading}label={t('password.label')} placeholder={t('password.placeholder')} type="password" {...form.getInputProps('password')} />
			{!isLoading ? <Button type="submit">{t('submit.label')}</Button> : <Loader visible />}
		</form>
	);
}
