'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { UserEditableProfileDefault } from '@/services/payload/collections/User/default';
import { UserOptions } from '@/services/payload/collections/User/options';
import { UserEditableProfile, UserEditableProfileValidation } from '@/services/payload/collections/User/validation';
import { type PayloadMeResponse } from '@/types/payload-api-response';
import { showNotification } from '@/services/general/show-notification';
import { Button, Checkbox, Select, Space, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { mergekit } from 'mergekit';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

export function AccountProfileForm() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountProfileForm');

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
			const response = await fetch('/api/account/profile/edit', {
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			userMutate({ ...userData, user: await response.json() });
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

	console.log(form.errors);

	//
	// E. Render components

	if (userDataLoading) {
		return <Text variant="overline">{t('loading')}</Text>;
	}

	if (userDataError || (!userDataLoading && !userData?.user)) {
		return <Text variant="overline">{t('error')}</Text>;
	}

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>

			<FormSection>
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<Select data={UserOptions.title} label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...form.getInputProps('title')} />
					<TextInput label={t('fields.first_name.label')} placeholder={t('fields.first_name.placeholder')} readOnly={isLoading} {...form.getInputProps('first_name')} />
				</div>
				<TextInput label={t('fields.last_name.label')} placeholder={t('fields.last_name.placeholder')} readOnly={isLoading} {...form.getInputProps('last_name')} />
				<TextInput label={t('fields.phone.label')} placeholder={t('fields.phone.placeholder')} readOnly={isLoading} {...form.getInputProps('phone')} type="tel" />
				<TextInput label={t('fields.email.label')} placeholder={t('fields.email.placeholder')} readOnly={isLoading} {...form.getInputProps('email')} type="email" />
			</FormSection>

			<FormSection description={t('sections.basic.description')} title={t('sections.basic.title')}>
				<TextInput description={t('fields.tax_id.description')} label={t('fields.tax_id.label')} placeholder={t('fields.tax_id.placeholder')} value={userData?.user.tax_id || ''} disabled readOnly />
				<TextInput description={t('fields.medical_id.description')} label={t('fields.medical_id.label')} placeholder={t('fields.medical_id.placeholder')} value={userData?.user.medical_id || ''} disabled readOnly />
				<DateInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} value={userData?.user?.birthday ? new Date(userData.user.birthday) : null} valueFormat="YYYY-MM-DD" disabled readOnly />
				<Checkbox label={t('fields.is_intern.label')} readOnly={isLoading} {...form.getInputProps('is_intern', { type: 'checkbox' })} />
				{form.values.is_intern && <DateInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} readOnly={isLoading} value={userData?.user?.birthday ? new Date(userData.user.birthday) : null} valueFormat="YYYY-MM-DD" />}
				{form.values.is_intern && <DateInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} readOnly={isLoading} value={userData?.user?.birthday ? new Date(userData.user.birthday) : null} valueFormat="YYYY-MM-DD" />}
				{form.values.is_intern && <DateInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} readOnly={isLoading} value={userData?.user?.birthday ? new Date(userData.user.birthday) : null} valueFormat="YYYY-MM-DD" />}
			</FormSection>

			<FormSection description={t('sections.billing.description')} title={t('sections.billing.title')}>
				<TextInput description={t('fields.billing_name.description')} label={t('fields.billing_name.label')} placeholder={t('fields.billing_name.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_name')} />
				<TextInput description={t('fields.billing_tax_id.description')} label={t('fields.billing_tax_id.label')} placeholder={t('fields.billing_tax_id.placeholder')} readOnly={isLoading} type="number" {...form.getInputProps('billing_tax_id')} />
				<TextInput description={t('fields.billing_address_1.description')} label={t('fields.billing_address_1.label')} placeholder={t('fields.billing_address_1.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_address_1')} />
				<TextInput label={t('fields.billing_address_2.label')} placeholder={t('fields.billing_address_2.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_address_2')} />
				<TextInput label={t('fields.billing_postal_code.label')} placeholder={t('fields.billing_postal_code.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_postal_code')} />
				<TextInput label={t('fields.billing_city.label')} placeholder={t('fields.billing_city.placeholder')} readOnly={isLoading} {...form.getInputProps('billing_city')} />
			</FormSection>

			<FormSection description={t('sections.activity.description')} title={t('sections.activity.title')}>
				<TextInput label={t('fields.workplace_primary.label')} placeholder={t('fields.workplace_primary.placeholder')} readOnly={isLoading} {...form.getInputProps('workplace_primary')} />
				<TextInput label={t('fields.workplace_secondary.label')} placeholder={t('fields.workplace_secondary.placeholder')} readOnly={isLoading} {...form.getInputProps('workplace_secondary')} />
				<Checkbox.Group label={t('fields.subscribed_sections.label')} readOnly={isLoading} {...form.getInputProps('subscribed_sections')}>
					{UserOptions.subscribed_sections.map(section => (
						<Checkbox key={section.value} label={section.label} value={section.value} />
					))}
				</Checkbox.Group>
			</FormSection>

			<FormSection description={t('sections.correspondence.description')} title={t('sections.correspondence.title')}>
				<TextInput label={t('fields.address_1.label')} placeholder={t('fields.address_1.placeholder')} readOnly={isLoading} {...form.getInputProps('address_1')} />
				<TextInput label={t('fields.address_2.label')} placeholder={t('fields.address_2.placeholder')} readOnly={isLoading} {...form.getInputProps('address_2')} />
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<TextInput label={t('fields.postal_code.label')} placeholder={t('fields.postal_code.placeholder')} readOnly={isLoading} {...form.getInputProps('postal_code')} />
					<TextInput label={t('fields.city.label')} placeholder={t('fields.city.placeholder')} readOnly={isLoading} {...form.getInputProps('city')} />
				</div>
				<TextInput label={t('fields.country.label')} placeholder={t('fields.country.placeholder')} readOnly={isLoading} {...form.getInputProps('country')} />
				<Checkbox label={t('fields.send_newsletter.label')} readOnly={isLoading} {...form.getInputProps('send_newsletter', { type: 'checkbox' })} />
			</FormSection>

			{isDirty && <Button disabled={!isValid} loading={isLoading} type="submit">{t('actions.submit.label')}</Button>}

			{(isDirty && !isValid) && (
				<>
					<Space h={10} />
					<Text variant="overline">{t('actions.has_errors')}</Text>
				</>
			)}

		</form>
	);

	//
}
