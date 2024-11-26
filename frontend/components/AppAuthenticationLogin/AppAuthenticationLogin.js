'use client';

/* * */

import Button from '@/components/common/Button';
import Loader from '@/components/Loader/Loader';
import Text from '@/components/Text/Text';
import TextField from '@/components/TextField/TextField';
import Title from '@/components/Title/Title';
import { SignInDefault } from '@/schemas/SignIn/default';
import { SignInValidation } from '@/schemas/SignIn/validation';
import { Space } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './AppAuthenticationLogin.module.css';

/* * */

export default function AppAuthenticationLogin() {
	//

	//
	// A. Setup variables

	const t = useTranslations('AppAuthenticationLogin');
	const [isLoading, setIsLoading] = useState(false);

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
		setIsLoading(true);
		signIn('email', { callbackUrl: '/', email: form.values.email });
	};

	//
	// D. Render components

	return (
		<form className={styles.container} onSubmit={form.onSubmit(handleSignIn)}>
			<Title level="h2" text={t('title')} />
			<Text text={t('subtitle')} />
			<Space h={5} />
			<TextField label={t('email.label')} placeholder={t('email.placeholder')} type="email" {...form.getInputProps('email')} />
			{!isLoading ? <Button label={t('submit.label')} type="submit" /> : <Loader visible />}
		</form>
	);
}
