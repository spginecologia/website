'use client';

/* * */

import { Users } from '@/collections/Users';
import { AccountProfileEditSection } from '@/components/account/AccountProfileEditSection';
import { UserDefault } from '@/schemas/User/default';
import { UserValidation } from '@/schemas/User/validation';
import { Button, Checkbox, Select, Space, Text, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

export function AccountProfileEdit() {
	//

	//
	// A. Setup variables

	const t = useTranslations('account.AccountProfileEdit');

	const [isLoading, setIsLoading] = useState(false);
	const [isDirty, setIsDirty] = useState(false);
	const [isValid, setIsValid] = useState(false);

	//
	// B. Fetch data

	const { data: userData, mutate: userMutate } = useSWR('/api/users/me');

	//
	// C. Transform data

	const titleOptions = useMemo(() => {
		const field = Users.fields.find(field => field['name'] === 'title');
		if (!field) return [];
		return field['options'];
	}, [Users.fields]);

	//
	// D. Handle actions

	useEffect(() => {
		// Return if no data
		if (!userData || !userData.user) return;
		// Return if no form or form is dirty
		if (!form || form.isDirty()) return;
		// Update form with user data
		form.setInitialValues(userData.user);
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
			await fetch('/api/account/profile/edit', {
				body: JSON.stringify(data),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			form.reset();
			userMutate();
			setIsLoading(false);
		}
		catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	//
	// E. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		initialValues: UserDefault,
		mode: 'uncontrolled',
		onValuesChange: handleValuesChange,
		validate: zodResolver(UserValidation),
	});

	//
	// F. Render components

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>

			<AccountProfileEditSection>
				<Select data={titleOptions} label={t('fields.title.label')} placeholder={t('fields.title.placeholder')} {...form.getInputProps('title')} />
				<TextInput label={t('fields.name.label')} placeholder={t('fields.name.placeholder')} readOnly={isLoading} {...form.getInputProps('name')} />
				<TextInput label={t('fields.last_name.label')} placeholder={t('fields.last_name.placeholder')} readOnly={isLoading} {...form.getInputProps('last_name')} />
				<TextInput label={t('fields.full_name.label')} placeholder={t('fields.full_name.placeholder')} readOnly={isLoading} {...form.getInputProps('full_name')} />
				<TextInput label={t('fields.phone.label')} placeholder={t('fields.phone.placeholder')} readOnly={isLoading} {...form.getInputProps('phone')} type="tel" />
				<TextInput label={t('fields.email.label')} placeholder={t('fields.email.placeholder')} readOnly={isLoading} {...form.getInputProps('email')} type="email" />
			</AccountProfileEditSection>

			<AccountProfileEditSection description={t('sections.basic.description')} title={t('sections.basic.title')}>
				<TextInput description={t('fields.tax_id.description')} label={t('fields.tax_id.label')} placeholder={t('fields.tax_id.placeholder')} readOnly {...form.getInputProps('tax_id')} />
				<TextInput description={t('fields.medical_id.description')} label={t('fields.medical_id.label')} placeholder={t('fields.medical_id.placeholder')} readOnly {...form.getInputProps('medical_id')} />
				<DateInput label={t('fields.birthday.label')} placeholder={t('fields.birthday.placeholder')} {...form.getInputProps('birthday')} />
			</AccountProfileEditSection>

			<AccountProfileEditSection description={t('sections.activity.description')} title={t('sections.activity.title')}>
				<TextInput label={t('fields.workplace_primary.label')} placeholder={t('fields.workplace_primary.placeholder')} readOnly={isLoading} {...form.getInputProps('workplace_primary')} />
				<TextInput label={t('fields.workplace_secondary.label')} placeholder={t('fields.workplace_secondary.placeholder')} readOnly={isLoading} {...form.getInputProps('workplace_secondary')} />
				<Checkbox.Group label={t('fields.subscribed_sections.label')}>
					<Checkbox label={t('fields.colposcopia_patologia_tracto_genital_inferior.label')} {...form.getInputProps('colposcopia_patologia_tracto_genital_inferior', { type: 'checkbox' })} />
					<Checkbox label={t('fields.endoscopia_ginecologica.label')} {...form.getInputProps('endoscopia_ginecologica', { type: 'checkbox' })} />
					<Checkbox label={t('fields.ginecologia_oncologica.label')} {...form.getInputProps('ginecologia_oncologica', { type: 'checkbox' })} />
					<Checkbox label={t('fields.menopausa.label')} {...form.getInputProps('menopausa', { type: 'checkbox' })} />
					<Checkbox label={t('fields.uroginecologia.label')} {...form.getInputProps('uroginecologia', { type: 'checkbox' })} />
				</Checkbox.Group>
			</AccountProfileEditSection>

			<AccountProfileEditSection description={t('sections.correspondence.description')} title={t('sections.correspondence.title')}>
				<TextInput label={t('fields.address_1.label')} placeholder={t('fields.address_1.placeholder')} readOnly={isLoading} {...form.getInputProps('address_1')} />
				<TextInput label={t('fields.address_2.label')} placeholder={t('fields.address_2.placeholder')} readOnly={isLoading} {...form.getInputProps('address_2')} />
				<TextInput label={t('fields.postal_code.label')} placeholder={t('fields.postal_code.placeholder')} readOnly={isLoading} {...form.getInputProps('postal_code')} />
				<TextInput label={t('fields.city.label')} placeholder={t('fields.city.placeholder')} readOnly={isLoading} {...form.getInputProps('city')} />
				<TextInput label={t('fields.country.label')} placeholder={t('fields.country.placeholder')} readOnly={isLoading} {...form.getInputProps('country')} />
			</AccountProfileEditSection>

			{isDirty && <Button disabled={!isValid} loading={isLoading} type="submit">{t('actions.submit.label')}</Button>}

			{(isDirty && !isValid) && (
				<>
					<Space h={10} />
					<Text variant="overline">{t('actions.has_errors')}</Text>
				</>
			)}

		</form>
	);
}
