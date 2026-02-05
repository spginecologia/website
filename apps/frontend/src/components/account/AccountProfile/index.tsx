'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { showNotification } from '@/services/general/show-notification';
import { UserEditableProfileDefault } from '@/services/payload/collections/User/default';
import { UserOptions } from '@/services/payload/collections/User/options';
import { UserEditableProfile, UserEditableProfileValidation } from '@/services/payload/collections/User/validation';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { Button, Checkbox, FileInput, NumberInput, Paper, Select, Space, Text, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { mergekit } from 'mergekit';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

/* * */

export function AccountProfile() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [isValid, setIsValid] = useState(false);

	//
	// B. Fetch data

	const { data: userData, error: userDataError, isLoading: userDataLoading, mutate: userMutate } = useSWR<PayloadMeResponse>('/api/users/me');

	//
	// C. Handle actions

	useEffect(() => {
		// Return if no data
		if (!userData || !userData.user) return;
		// Return if no form or form is dirty
		if (!form || form.isDirty()) return;
		// Merge server data with form schema
		const mergedData = mergekit(
			[UserEditableProfileDefault, userData.user],
			{ onlyKeys: Object.keys(UserEditableProfileDefault) },
		);
		// Update form with merged data,
		// and apply additional type transformations.
		form.setInitialValues({
			...mergedData,
			birthday: userData.user.birthday ? new Date(userData.user.birthday) : new Date(1900, 0, 1),
		});
		// Reset form state
		form.reset();
		//
	}, [userData]);

	const handleValuesChange = () => {
		form.validate();
		setIsDirty(form.isDirty());
		setIsValid(form.isValid());
	};

	const handleSubmit = async (data) => {
		try {
			setIsLoading(true);
			showNotification({ id: 'submit-profile', message: 'Por favor aguarde...', title: 'A atualizar o seu perfil', type: 'loading' });
			const formData = new FormData();
			formData.append('_json_data', JSON.stringify(data));
			formData.append('intern_proof', data.intern_proof);
			const response = await fetch('/api/account/profile/edit', {
				body: formData,
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			userMutate();
			form.reset();
			setIsLoading(false);
			showNotification({ action: 'update', id: 'submit-profile', message: 'Os seus dados foram atualizados com sucesso!', title: 'Dados Atualizados!', type: 'success' });
		}
		catch (error) {
			console.log(error);
			showNotification({ action: 'update', id: 'submit-profile', message: 'Ocorreu um erro ao atualizar os dados do seu perfil.', title: 'Perfil não atualizado', type: 'error' });
			setIsLoading(false);
		}
	};

	//
	// D. Setup form

	const form = useForm<UserEditableProfile>({
		clearInputErrorOnChange: true,
		initialValues: UserEditableProfileDefault,
		onValuesChange: handleValuesChange,
		validate: zod4Resolver(UserEditableProfileValidation),
		validateInputOnBlur: true,
		validateInputOnChange: true,
	});

	//
	// E. Render components

	if (userDataLoading) {
		return (
			<Paper>
				<Title order={2}>{t('account.AccountProfile.title')}</Title>
				<Space h="xs" />
				<Text>{t('account.AccountProfile.subtitle')}</Text>
				<Space h="xl" />
				<Text variant="overline">{t('account.AccountProfile.loading')}</Text>
			</Paper>
		);
	}

	if (userDataError || (!userDataLoading && !userData?.user)) {
		return (
			<Paper>
				<Title order={2}>{t('account.AccountProfile.title')}</Title>
				<Space h="xs" />
				<Text>{t('account.AccountProfile.subtitle')}</Text>
				<Space h="xl" />
				<Text variant="overline">{t('account.AccountProfile.error')}</Text>
			</Paper>
		);
	}

	return (
		<Paper>
			<Title order={2}>{t('account.AccountProfile.title')}</Title>
			<Space h="xs" />
			<Text>{t('account.AccountProfile.subtitle')}</Text>
			<Space h="xl" />

			<form onSubmit={form.onSubmit(handleSubmit)}>

				<FormSection>
					<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
						<Select data={UserOptions.title} label={t('account.AccountProfile.fields.title.label')} placeholder={t('account.AccountProfile.fields.title.placeholder')} {...form.getInputProps('title')} />
						<TextInput label={t('account.AccountProfile.fields.first_name.label')} placeholder={t('account.AccountProfile.fields.first_name.placeholder')} readOnly={isLoading} {...form.getInputProps('first_name')} />
					</div>
					<TextInput label={t('account.AccountProfile.fields.last_name.label')} placeholder={t('account.AccountProfile.fields.last_name.placeholder')} readOnly={isLoading} {...form.getInputProps('last_name')} />
					<TextInput label={t('account.AccountProfile.fields.phone.label')} placeholder={t('account.AccountProfile.fields.phone.placeholder')} readOnly={isLoading} {...form.getInputProps('phone')} type="tel" />
					<TextInput label={t('account.AccountProfile.fields.email.label')} placeholder={t('account.AccountProfile.fields.email.placeholder')} readOnly={isLoading} {...form.getInputProps('email')} type="email" />
				</FormSection>

				<FormSection description={t('account.AccountProfile.sections.basic.description')} title={t('account.AccountProfile.sections.basic.title')}>
					<TextInput description={t('account.AccountProfile.fields.tax_id.description')} label={t('account.AccountProfile.fields.tax_id.label')} placeholder={t('account.AccountProfile.fields.tax_id.placeholder')} value={userData?.user.tax_id || ''} disabled readOnly />
					<TextInput description={t('account.AccountProfile.fields.medical_id.description')} label={t('account.AccountProfile.fields.medical_id.label')} placeholder={t('account.AccountProfile.fields.medical_id.placeholder')} value={userData?.user.medical_id || ''} disabled readOnly />
					<DateInput label={t('account.AccountProfile.fields.birthday.label')} placeholder={t('account.AccountProfile.fields.birthday.placeholder')} value={userData?.user?.birthday ? new Date(userData.user.birthday) : null} valueFormat="YYYY-MM-DD" disabled readOnly />
				</FormSection>

				<Checkbox label={t('account.AccountProfile.fields.is_intern.label')} readOnly={isLoading} {...form.getInputProps('is_intern', { type: 'checkbox' })} />

				{form.values.is_intern && (
					<FormSection description={t('account.AccountProfile.sections.internship.description')} title={t('account.AccountProfile.sections.internship.title')}>
						<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 1fr' }}>
							<NumberInput label={t('account.AccountProfile.fields.intern_since.label')} placeholder={t('account.AccountProfile.fields.intern_since.placeholder')} readOnly={isLoading} {...form.getInputProps('intern_since')} max={2050} min={2000} />
							<NumberInput label={t('account.AccountProfile.fields.intern_until.label')} placeholder={t('account.AccountProfile.fields.intern_until.placeholder')} readOnly={isLoading} {...form.getInputProps('intern_until')} max={2050} min={2000} />
						</div>
						<FileInput label={t('account.AccountProfile.fields.intern_proof.label')} placeholder={t('account.AccountProfile.fields.intern_proof.placeholder')} readOnly={isLoading} {...form.getInputProps('intern_proof')} />
						{userData?.user.intern_proof && <Text variant="link">{typeof userData.user.intern_proof === 'string' ? userData.user.intern_proof : '✅ Comprovativo submetido'}</Text>}
					</FormSection>
				)}

				<FormSection description={t('account.AccountProfile.sections.billing.description')} title={t('account.AccountProfile.sections.billing.title')}>
					<TextInput description={t('account.AccountProfile.fields.billing_name.description')} label={t('account.AccountProfile.fields.billing_name.label')} placeholder={t('account.AccountProfile.fields.billing_name.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_name')} />
					<TextInput description={t('account.AccountProfile.fields.billing_tax_id.description')} label={t('account.AccountProfile.fields.billing_tax_id.label')} placeholder={t('account.AccountProfile.fields.billing_tax_id.placeholder')} readOnly={isLoading} type="number" {...form.getInputProps('billing_tax_id')} />
					<TextInput description={t('account.AccountProfile.fields.billing_address_1.description')} label={t('account.AccountProfile.fields.billing_address_1.label')} placeholder={t('account.AccountProfile.fields.billing_address_1.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_address_1')} />
					<TextInput label={t('account.AccountProfile.fields.billing_address_2.label')} placeholder={t('account.AccountProfile.fields.billing_address_2.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_address_2')} />
					<TextInput label={t('account.AccountProfile.fields.billing_postal_code.label')} placeholder={t('account.AccountProfile.fields.billing_postal_code.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_postal_code')} />
					<TextInput label={t('account.AccountProfile.fields.billing_city.label')} placeholder={t('account.AccountProfile.fields.billing_city.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_city')} />
				</FormSection>

				<FormSection description={t('account.AccountProfile.sections.activity.description')} title={t('account.AccountProfile.sections.activity.title')}>
					<TextInput label={t('account.AccountProfile.fields.workplace_primary.label')} placeholder={t('account.AccountProfile.fields.workplace_primary.placeholder')} readOnly={isLoading} {...form.getInputProps('workplace_primary')} />
					<TextInput label={t('account.AccountProfile.fields.workplace_secondary.label')} placeholder={t('account.AccountProfile.fields.workplace_secondary.placeholder')} readOnly={isLoading} {...form.getInputProps('workplace_secondary')} />
					<Checkbox.Group label={t('account.AccountProfile.fields.subscribed_sections.label')} readOnly={isLoading} {...form.getInputProps('subscribed_sections')}>
						{UserOptions.subscribed_sections.map(section => (
							<Checkbox key={section.value} label={section.label} value={section.value} />
						))}
					</Checkbox.Group>
				</FormSection>

				<FormSection description={t('account.AccountProfile.sections.correspondence.description')} title={t('account.AccountProfile.sections.correspondence.title')}>
					<TextInput label={t('account.AccountProfile.fields.address_1.label')} placeholder={t('account.AccountProfile.fields.address_1.placeholder')} readOnly={isLoading} {...form.getInputProps('address_1')} />
					<TextInput label={t('account.AccountProfile.fields.address_2.label')} placeholder={t('account.AccountProfile.fields.address_2.placeholder')} readOnly={isLoading} {...form.getInputProps('address_2')} />
					<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
						<TextInput label={t('account.AccountProfile.fields.postal_code.label')} placeholder={t('account.AccountProfile.fields.postal_code.placeholder')} readOnly={isLoading} {...form.getInputProps('postal_code')} />
						<TextInput label={t('account.AccountProfile.fields.city.label')} placeholder={t('account.AccountProfile.fields.city.placeholder')} readOnly={isLoading} {...form.getInputProps('city')} />
					</div>
					<TextInput label={t('account.AccountProfile.fields.country.label')} placeholder={t('account.AccountProfile.fields.country.placeholder')} readOnly={isLoading} {...form.getInputProps('country')} />
					<Checkbox label={t('account.AccountProfile.fields.send_newsletter.label')} readOnly={isLoading} {...form.getInputProps('send_newsletter', { type: 'checkbox' })} />
				</FormSection>

				{isDirty && <Button disabled={!isValid} loading={isLoading} type="submit">{t('account.AccountProfile.actions.submit.label')}</Button>}

				{(isDirty && !isValid) && (
					<>
						<Space h={10} />
						<Text variant="overline">{t('account.AccountProfile.actions.has_errors')}</Text>
					</>
				)}

			</form>

		</Paper>
	);

	//
}
