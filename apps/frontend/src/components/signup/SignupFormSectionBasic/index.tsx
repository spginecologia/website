'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { UserOptions } from '@/services/payload/collections/User/options';
import { Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionBasic() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	return (
		<>

			<FormSection>
				<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
					<Select data={UserOptions.title} label={t('auth.SignupForm.fields.title.label')} placeholder={t('auth.SignupForm.fields.title.placeholder')} {...signupFormContext.data.form.getInputProps('title')} />
					<TextInput label={t('auth.SignupForm.fields.first_name.label')} placeholder={t('auth.SignupForm.fields.first_name.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.first_name)} {...signupFormContext.data.form.getInputProps('first_name')} />
				</div>
				<TextInput label={t('auth.SignupForm.fields.last_name.label')} placeholder={t('auth.SignupForm.fields.last_name.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.last_name)} {...signupFormContext.data.form.getInputProps('last_name')} />
				<TextInput label={t('auth.SignupForm.fields.phone.label')} placeholder={t('auth.SignupForm.fields.phone.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.phone)} {...signupFormContext.data.form.getInputProps('phone')} type="tel" />
				<TextInput label={t('auth.SignupForm.fields.email.label')} placeholder={t('auth.SignupForm.fields.email.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.email)} {...signupFormContext.data.form.getInputProps('email')} type="email" />
			</FormSection>

			<FormSection description={t('auth.SignupForm.sections.basic.description')} title={t('auth.SignupForm.sections.basic.title')}>
				<TextInput description={t('auth.SignupForm.fields.tax_id.description')} label={t('auth.SignupForm.fields.tax_id.label')} placeholder={t('auth.SignupForm.fields.tax_id.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.tax_id)} {...signupFormContext.data.form.getInputProps('tax_id')} />
				<TextInput description={t('auth.SignupForm.fields.medical_id.description')} label={t('auth.SignupForm.fields.medical_id.label')} placeholder={t('auth.SignupForm.fields.medical_id.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.medical_id)} {...signupFormContext.data.form.getInputProps('medical_id')} />
				<DateInput label={t('auth.SignupForm.fields.birthday.label')} placeholder={t('auth.SignupForm.fields.birthday.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.birthday)} {...signupFormContext.data.form.getInputProps('birthday')} valueFormat="YYYY-MM-DD" />
			</FormSection>

		</>
	);
}
