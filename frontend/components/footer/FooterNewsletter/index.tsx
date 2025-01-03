'use client';

/* * */

import { NewsletterDefault } from '@/payload/collections/Newsletter/default';
import { NewsletterValidation } from '@/payload/collections/Newsletter/validation';
import { Button, Loader, Space, Text, TextInput, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { Turnstile } from '@marsidev/react-turnstile';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function FooterNewsletter() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.FooterNewsletter');

	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
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

	useEffect(() => {
		if (!isSuccess) return;
		const timeout = setTimeout(() => {
			setIsSuccess(false);
			setIsError(false);
			setIsLoading(false);
		}, 10000);
		return () => clearTimeout(timeout);
	}, [isSuccess]);

	const handleSubscribe = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/newsletter/subscribe', {
				body: JSON.stringify(form.getValues()),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(`Failed to subscribe. Status: ${response.status}`);
			}
			setIsLoading(false);
			setIsSuccess(true);
		}
		catch (err) {
			console.log(err.message);
			setIsLoading(false);
			setIsSuccess(false);
			setIsError(true);
		}
	};

	//
	// D. Render components

	if (isSuccess) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					<Title id={styles.title} order={2}>{t('title')}</Title>
					<Text id={styles.subtitle}>{t('subtitle')}</Text>
				</div>
				<Text id={styles.successMessage} variant="overline">{t('success_message')}</Text>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Title id={styles.title} order={2}>{t('title')}</Title>
				<Text id={styles.subtitle}>{t('subtitle')}</Text>
			</div>
			<form className={styles.form} onSubmit={form.onSubmit(handleSubscribe)}>
				<TextInput aria-label={t('form.name.label')} placeholder={t('form.name.placeholder')} variant="contrast" w="100%" {...form.getInputProps('name')} />
				<TextInput aria-label={t('form.email.label')}placeholder={t('form.email.placeholder')} variant="contrast" w="100%" {...form.getInputProps('email')} />
				<Turnstile onSuccess={token => form.setFieldValue('turnstile_token', token)} siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ''} />
				{isLoading && <Loader />}
				{(!isLoading && form.values.email.length > 0) && <Button disabled={!form.isValid()} type="submit" variant="contrast" w="100%">{t('subscribe')}</Button>}
				{(!isLoading && isError) && (
					<>
						<Space h={20} />
						<Text id={styles.errorMessage} variant="error">{t('error_message')}</Text>
					</>
				)}

			</form>
		</div>
	);
}
