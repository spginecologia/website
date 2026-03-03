'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { SignupFormDefault } from '@/services/payload/collections/Signup/default';
import { type SignupResponse } from '@/services/payload/collections/Signup/types';
import { type SignupForm, SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { UserOptions } from '@/services/payload/collections/User/options';
import { ActionIcon, Alert, Button, Checkbox, Loader, Paper, Radio, Select, Space, Text, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconMinus, IconPlus, IconRosetteDiscountCheckFilled, IconUserHeart } from '@tabler/icons-react';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

import { SignupFormSponsorInput } from '../SignupFormSponsorInput';

/* * */

export function SignupForm() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const [signupResponse, setSignupResponse] = useState<null | SignupResponse>();

	//
	// B. Setup form

	const form = useForm<SignupForm>({
		// clearInputErrorOnChange: true,
		initialValues: SignupFormDefault,
		onValuesChange: () => {
			setIsError(false);
			const validationResult = form.validate();
			console.log('Form validation result:', validationResult);
		},
		validate: zod4Resolver(SignupFormValidation),
		validateInputOnChange: true,
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddSponsor = () => {
		const currentSponsors = form.getValues().enrolment_sponsors ?? [];
		if (currentSponsors.length >= 5) return; // Limit to 5 sponsors
		form.insertListItem('enrolment_sponsors', { is_valid: false, tax_id: '' });
	};

	const handleRemoveSponsor = (index: number) => {
		form.removeListItem('enrolment_sponsors', index);
	};

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
		} catch (error) {
			console.log(error.message);
			setIsLoading(false);
			setIsError(true);
		}
	};

	//
	// D. Render components

	if (signupResponse?.status === 'user_exists') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('auth.SignupForm.title')}</Title>
				<Space h={5} />
				<Alert icon={<IconUserHeart />} title={t('auth.SignupForm.status.user_exists.alert.title')} w="100%">
					<Text size="sm">{t('auth.SignupForm.status.user_exists.alert.message')}</Text>
					<Space h={5} />
					<Button component={Link} href="/forgot">{t('auth.SignupForm.status.user_exists.alert.action')}</Button>
					<Space h={5} />
				</Alert>
			</Paper>
		);
	}

	if (signupResponse?.status === 'user_created') {
		return (
			<Paper className={styles.container}>
				<Title order={2}>{t('auth.SignupForm.title')}</Title>
				<Text>{t('auth.SignupForm.subtitle')}</Text>
				<Space h={5} />
				<Alert icon={<IconRosetteDiscountCheckFilled />} title={t('auth.SignupForm.status.user_created.alert.title')} w="100%">
					<Text size="sm">{t('auth.SignupForm.status.user_created.alert.message')}</Text>
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

			<Title order={2}>{t('auth.SignupForm.title')}</Title>
			<Text>{t('auth.SignupForm.subtitle')}</Text>

			<FormSection>
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<Select data={UserOptions.title} label={t('auth.SignupForm.fields.title.label')} placeholder={t('auth.SignupForm.fields.title.placeholder')} {...form.getInputProps('title')} />
					<TextInput label={t('auth.SignupForm.fields.first_name.label')} placeholder={t('auth.SignupForm.fields.first_name.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.first_name)} {...form.getInputProps('first_name')} />
				</div>
				<TextInput label={t('auth.SignupForm.fields.last_name.label')} placeholder={t('auth.SignupForm.fields.last_name.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.last_name)} {...form.getInputProps('last_name')} />
				<TextInput label={t('auth.SignupForm.fields.phone.label')} placeholder={t('auth.SignupForm.fields.phone.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.phone)} {...form.getInputProps('phone')} type="tel" />
				<TextInput label={t('auth.SignupForm.fields.email.label')} placeholder={t('auth.SignupForm.fields.email.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.email)} {...form.getInputProps('email')} type="email" />
			</FormSection>

			<FormSection description={t('auth.SignupForm.sections.basic.description')} title={t('auth.SignupForm.sections.basic.title')}>
				<TextInput description={t('auth.SignupForm.fields.tax_id.description')} label={t('auth.SignupForm.fields.tax_id.label')} placeholder={t('auth.SignupForm.fields.tax_id.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.tax_id)} {...form.getInputProps('tax_id')} />
				<TextInput description={t('auth.SignupForm.fields.medical_id.description')} label={t('auth.SignupForm.fields.medical_id.label')} placeholder={t('auth.SignupForm.fields.medical_id.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.medical_id)} {...form.getInputProps('medical_id')} />
				<DateInput label={t('auth.SignupForm.fields.birthday.label')} placeholder={t('auth.SignupForm.fields.birthday.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.birthday)} {...form.getInputProps('birthday')} valueFormat="YYYY-MM-DD" />
			</FormSection>

			<FormSection description={t('auth.SignupForm.sections.billing.description')} title={t('auth.SignupForm.sections.billing.title')}>
				<TextInput description={t('auth.SignupForm.fields.billing_name.description')} label={t('auth.SignupForm.fields.billing_name.label')} placeholder={t('auth.SignupForm.fields.billing_name.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_name)} {...form.getInputProps('billing_name')} />
				<TextInput description={t('auth.SignupForm.fields.billing_tax_id.description')} label={t('auth.SignupForm.fields.billing_tax_id.label')} placeholder={t('auth.SignupForm.fields.billing_tax_id.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_tax_id)} type="number" {...form.getInputProps('billing_tax_id')} />
				<TextInput description={t('auth.SignupForm.fields.billing_address_1.description')} label={t('auth.SignupForm.fields.billing_address_1.label')} placeholder={t('auth.SignupForm.fields.billing_address_1.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_address_1)} {...form.getInputProps('billing_address_1')} />
				<TextInput label={t('auth.SignupForm.fields.billing_address_2.label')} placeholder={t('auth.SignupForm.fields.billing_address_2.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_address_2)} {...form.getInputProps('billing_address_2')} />
				<TextInput label={t('auth.SignupForm.fields.billing_postal_code.label')} placeholder={t('auth.SignupForm.fields.billing_postal_code.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_postal_code)} {...form.getInputProps('billing_postal_code')} />
				<TextInput label={t('auth.SignupForm.fields.billing_city.label')} placeholder={t('auth.SignupForm.fields.billing_city.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_city)} {...form.getInputProps('billing_city')} />
			</FormSection>

			<FormSection description={t('auth.SignupForm.sections.activity.description')} title={t('auth.SignupForm.sections.activity.title')}>
				<TextInput label={t('auth.SignupForm.fields.workplace_primary.label')} placeholder={t('auth.SignupForm.fields.workplace_primary.placeholder')} {...form.getInputProps('workplace_primary')} />
				<TextInput label={t('auth.SignupForm.fields.workplace_secondary.label')} placeholder={t('auth.SignupForm.fields.workplace_secondary.placeholder')} {...form.getInputProps('workplace_secondary')} />
				<Checkbox.Group label={t('auth.SignupForm.fields.subscribed_sections.label')} {...form.getInputProps('subscribed_sections')}>
					{UserOptions.subscribed_sections.map(section => (
						<Checkbox key={section.value} label={section.label} value={section.value} />
					))}
				</Checkbox.Group>
			</FormSection>

			<FormSection description={t('auth.SignupForm.sections.correspondence.description')} title={t('auth.SignupForm.sections.correspondence.title')}>
				<TextInput label={t('auth.SignupForm.fields.address_1.label')} placeholder={t('auth.SignupForm.fields.address_1.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.address_1)} {...form.getInputProps('address_1')} />
				<TextInput label={t('auth.SignupForm.fields.address_2.label')} placeholder={t('auth.SignupForm.fields.address_2.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.address_2)} {...form.getInputProps('address_2')} />
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<TextInput label={t('auth.SignupForm.fields.postal_code.label')} placeholder={t('auth.SignupForm.fields.postal_code.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.postal_code)} {...form.getInputProps('postal_code')} />
					<TextInput label={t('auth.SignupForm.fields.city.label')} placeholder={t('auth.SignupForm.fields.city.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.city)} {...form.getInputProps('city')} />
				</div>
				<TextInput label={t('auth.SignupForm.fields.country.label')} placeholder={t('auth.SignupForm.fields.country.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.country)} {...form.getInputProps('country')} />
				<Checkbox label={t('auth.SignupForm.fields.send_newsletter.label')} required={isRequiredFromZod(SignupFormValidation.shape.send_newsletter)} {...form.getInputProps('send_newsletter', { type: 'checkbox' })} />
			</FormSection>

			<FormSection description={t('auth.SignupForm.sections.enrolment.description')} title={t('auth.SignupForm.sections.enrolment.title')}>
				<Radio.Group label={t('auth.SignupForm.fields.enrolment_type.label')} {...form.getInputProps('enrolment_type')}>
					{UserOptions.enrolment_type.filter(item => item.value !== 'direct').map(item => (
						<Radio
							key={item.value}
							description={t(`auth.SignupForm.fields.enrolment_type.description.${item.value}`)}
							label={item.label}
							value={item.value}
						/>
					))}
				</Radio.Group>
				{form.values.enrolment_type === 'effective' && (
					<>
						<div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
							<Text size="sm">{t('auth.SignupForm.fields.enrolment_sponsors.description')}</Text>
							<ActionIcon onClick={handleAddSponsor}>
								<IconPlus />
							</ActionIcon>
						</div>
						{form.values.enrolment_sponsors?.map((sponsor, index) => (
							<div key={index} style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
								<SignupFormSponsorInput
									onChange={value => form.setFieldValue(`enrolment_sponsors.${index}.tax_id`, value)}
									onValidate={valid => form.setFieldValue(`enrolment_sponsors.${index}.is_valid`, valid)}
									value={sponsor.tax_id}
								/>
								<ActionIcon onClick={() => handleRemoveSponsor(index)}>
									<IconMinus />
								</ActionIcon>
							</div>
						))}
					</>
				)}
			</FormSection>

			{isLoading && <Loader />}
			{(!isLoading && form.isDirty()) && <Button disabled={!form.isValid()} type="submit">{t('auth.SignupForm.actions.submit.label')}</Button>}
			{(!isLoading && isError) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('auth.SignupForm.error')}</Text>
				</>
			)}

		</Paper>
	);

	//
}
