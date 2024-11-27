'use client';

/* * */

import Button from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import Text from '@/components/Text/Text';
import Title from '@/components/Title/Title';
import { SignInDefault } from '@/schemas/SignIn/default';
import { SignInValidation } from '@/schemas/SignIn/validation';
import { PasswordInput, Space, TextInput } from '@mantine/core';
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
				console.error('Login failed. Please try again.');
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
				<Title level="h2" text={t('title')} />
				<Space />
				<p className={styles.errorMessage}>{t('error.message')}</p>
				<Space />
				<Button label={t('error.retry')} onClick={handleRetry} />
			</div>
		);
	}

	return (
		<form className={styles.container} onSubmit={form.onSubmit(handleSignIn)}>
			<Title level="h2" text={t('title')} />
			<Text text={t('subtitle')} />
			<Space h={5} />
			<TextInput label={t('email.label')} placeholder={t('email.placeholder')} type="email" {...form.getInputProps('email')} />
			<PasswordInput label={t('email.label')} placeholder={t('email.placeholder')} {...form.getInputProps('password')} />
			{!isLoading ? <Button label={t('submit.label')} type="submit" /> : <Loader visible />}
		</form>
	);
}
