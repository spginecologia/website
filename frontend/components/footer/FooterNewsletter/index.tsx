'use client';

/* * */

import { NewsletterDefault } from '@/schemas/Newsletter/default';
import { NewsletterValidation } from '@/schemas/Newsletter/validation';
import { Button, Loader, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export function FooterNewsletter() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.FooterNewsletter');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: NewsletterDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zodResolver(NewsletterValidation),
	});

	//
	// C. Handle actions

	const handleSubscribe = async () => {
		try {
			setIsLoading(true);
			// const loginResponse = await fetch('/api/account/login', {
			// 	body: JSON.stringify({
			// 		email: form.values.email,
			// 		password: form.values.password,
			// 	}),
			// 	headers: {
			// 		'Content-Type': 'application/json',
			// 	},
			// 	method: 'POST',
			// });
			// if (!loginResponse.ok) {
			// 	throw new Error(`Failed to login. Status: ${loginResponse.status}`);
			// }
			console.log('Login successful. Redirecting to account page...');
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
		<div className={styles.container}>
			<div className={styles.header}>
				<Title id={styles.title} order={2}>{t('title')}</Title>
				<Text id={styles.subtitle}>{t('subtitle')}</Text>
			</div>
			<form className={styles.form} onSubmit={form.onSubmit(handleSubscribe)}>
				<TextInput aria-label={t('form.name.label')} placeholder={t('form.name.placeholder')} variant="contrast" w="100%" {...form.getInputProps('name')} />
				<TextInput aria-label={t('form.email.label')}placeholder={t('form.email.placeholder')} variant="contrast" w="100%" {...form.getInputProps('email')} />

				{isLoading && <Loader />}
				{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit" variant="contrast" w="100%">{t('subscribe')}</Button>}
				{(!isLoading && isError) && (
					<>
						<Space h={5} />
						<Text variant="error">{t('error.message')}</Text>
					</>
				)}

			</form>
		</div>
	);
}
