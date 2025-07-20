'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { SignupFormDefault } from '@/services/payload/collections/Signup/default';
import { type SignupResponse } from '@/services/payload/collections/Signup/types';
import { SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { UserOptions } from '@/services/payload/collections/User/options';
import { Alert, Button, Checkbox, Loader, Paper, Select, Space, Text, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconRosetteDiscountCheckFilled, IconUserHeart } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function SignupForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('auth.SignupForm');

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [signupResponse, setSignupResponse] = useState<null | SignupResponse>();

	//
	// B. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: SignupFormDefault,
		onValuesChange: () => {
			setIsError(false);
		},
		validate: zod4Resolver(SignupFormValidation),
	});

	//
	// C. Handle actions

	useEffect(() => {
		// Get pre-filled values from URL query params
		const params = new URLSearchParams(window.location.search);
		const email = params.get('email');
		const taxId = params.get('tax_id');
		if (email) form.setFieldValue('email', email);
		if (taxId) form.setFieldValue('tax_id', taxId);
	}, []);

	const handleSignup = async () => {
		try {
			setIsLoading(true);
			setIsError(false);
			setSignupResponse(null);
			const response = await fetch('/api/auth/signup', {
				body: JSON.stringify(form.values),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (!response.ok) throw new Error(`Failed to Check. Status: ${response.status}`);
			const responseData = await response.json();
			setIsLoading(false);
			setSignupResponse(responseData);
		}
		catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	//
	// D. Render components

	if (signupResponse && signupResponse.status === 'user_exists') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Space h={5} />
				<Alert icon={<IconUserHeart />} title={t('status.user_exists.alert.title')} w="100%">
					<Text size="sm">{t('status.user_exists.alert.message')}</Text>
					<Space h={5} />
					<Button component={Link} href="/forgot">{t('status.user_exists.alert.action')}</Button>
					<Space h={5} />
				</Alert>
			</Paper>
		);
	}

	if (signupResponse && signupResponse.status === 'user_created') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('title')}</Title>
				<Text>{t('subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconRosetteDiscountCheckFilled />} title={t('status.user_created.alert.title')} w="100%">
					<Text size="sm">{t('status.user_created.alert.message')}</Text>
					<Space h={5} />
					<Text fw="bold" size="xs">+351 218 429 710</Text>
					<Text fw="bold" size="xs">secretariado@spginecologia.pt</Text>
					<Space h={5} />
				</Alert>
			</Paper>
		);
	}

	return (
		<Paper className={styles.container} component="form" onSubmit={form.onSubmit(handleSignup)}>

			<Title order={2}>{t('title')}</Title>
			<Text>{t('subtitle')}</Text>

			<FormSection>
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<Select data={UserOptions.title} label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...form.getInputProps('title')} />
					<TextInput label={t('fields.first_name.label')} placeholder={t('fields.first_name.placeholder')} {...form.getInputProps('first_name')} />
				</div>
				<TextInput label={t('fields.last_name.label')} placeholder={t('fields.last_name.placeholder')} {...form.getInputProps('last_name')} />
				<TextInput label={t('fields.phone.label')} placeholder={t('fields.phone.placeholder')} {...form.getInputProps('phone')} type="tel" />
				<TextInput label={t('fields.email.label')} placeholder={t('fields.email.placeholder')} {...form.getInputProps('email')} type="email" />
			</FormSection>

			<FormSection description={t('sections.basic.description')} title={t('sections.basic.title')}>
				<TextInput description={t('fields.tax_id.description')} label={t('fields.tax_id.label')} placeholder={t('fields.tax_id.placeholder')} {...form.getInputProps('tax_id')} />
				<TextInput description={t('fields.medical_id.description')} label={t('fields.medical_id.label')} placeholder={t('fields.medical_id.placeholder')} {...form.getInputProps('medical_id')} />
				<DateInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} {...form.getInputProps('birthday')} valueFormat="YYYY-MM-DD" />
			</FormSection>

			<FormSection description={t('sections.billing.description')} title={t('sections.billing.title')}>
				<TextInput description={t('fields.billing_name.description')} label={t('fields.billing_name.label')} placeholder={t('fields.billing_name.placeholder')} {...form.getInputProps('billing_name')} />
				<TextInput description={t('fields.billing_tax_id.description')} label={t('fields.billing_tax_id.label')} placeholder={t('fields.billing_tax_id.placeholder')} type="number" {...form.getInputProps('billing_tax_id')} />
				<TextInput description={t('fields.billing_address_1.description')} label={t('fields.billing_address_1.label')} placeholder={t('fields.billing_address_1.placeholder')} {...form.getInputProps('billing_address_1')} />
				<TextInput label={t('fields.billing_address_2.label')} placeholder={t('fields.billing_address_2.placeholder')} {...form.getInputProps('billing_address_2')} />
				<TextInput label={t('fields.billing_postal_code.label')} placeholder={t('fields.billing_postal_code.placeholder')} {...form.getInputProps('billing_postal_code')} />
				<TextInput label={t('fields.billing_city.label')} placeholder={t('fields.billing_city.placeholder')} {...form.getInputProps('billing_city')} />
			</FormSection>

			<FormSection description={t('sections.activity.description')} title={t('sections.activity.title')}>
				<TextInput label={t('fields.workplace_primary.label')} placeholder={t('fields.workplace_primary.placeholder')} {...form.getInputProps('workplace_primary')} />
				<TextInput label={t('fields.workplace_secondary.label')} placeholder={t('fields.workplace_secondary.placeholder')} {...form.getInputProps('workplace_secondary')} />
				<Checkbox.Group label={t('fields.subscribed_sections.label')} {...form.getInputProps('subscribed_sections')}>
					{UserOptions.subscribed_sections.map(section => (
						<Checkbox key={section.value} label={section.label} value={section.value} />
					))}
				</Checkbox.Group>
			</FormSection>

			<FormSection description={t('sections.correspondence.description')} title={t('sections.correspondence.title')}>
				<TextInput label={t('fields.address_1.label')} placeholder={t('fields.address_1.placeholder')} {...form.getInputProps('address_1')} />
				<TextInput label={t('fields.address_2.label')} placeholder={t('fields.address_2.placeholder')} {...form.getInputProps('address_2')} />
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<TextInput label={t('fields.postal_code.label')} placeholder={t('fields.postal_code.placeholder')} {...form.getInputProps('postal_code')} />
					<TextInput label={t('fields.city.label')} placeholder={t('fields.city.placeholder')} required {...form.getInputProps('city')} />
				</div>
				<TextInput label={t('fields.country.label')} placeholder={t('fields.country.placeholder')} {...form.getInputProps('country')} />
				<Checkbox label={t('fields.send_newsletter.label')} {...form.getInputProps('send_newsletter', { type: 'checkbox' })} />
			</FormSection>

			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('actions.submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('error.message')}</Text>
				</>
			)}
		</Paper>
	);

	//
}
