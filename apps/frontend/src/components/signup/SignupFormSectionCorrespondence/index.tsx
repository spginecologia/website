'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { Checkbox, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionCorrespondence() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	return (
		<FormSection description={t('auth.SignupForm.sections.correspondence.description')} title={t('auth.SignupForm.sections.correspondence.title')}>
			<TextInput label={t('auth.SignupForm.fields.address_1.label')} placeholder={t('auth.SignupForm.fields.address_1.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.address_1)} {...signupFormContext.data.form.getInputProps('address_1')} />
			<TextInput label={t('auth.SignupForm.fields.address_2.label')} placeholder={t('auth.SignupForm.fields.address_2.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.address_2)} {...signupFormContext.data.form.getInputProps('address_2')} />
			<div style={{ display: 'grid', gap: 10, gridTemplateColumns: '1fr 2fr' }}>
				<TextInput label={t('auth.SignupForm.fields.postal_code.label')} placeholder={t('auth.SignupForm.fields.postal_code.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.postal_code)} {...signupFormContext.data.form.getInputProps('postal_code')} />
				<TextInput label={t('auth.SignupForm.fields.city.label')} placeholder={t('auth.SignupForm.fields.city.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.city)} {...signupFormContext.data.form.getInputProps('city')} />
			</div>
			<TextInput label={t('auth.SignupForm.fields.country.label')} placeholder={t('auth.SignupForm.fields.country.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.country)} {...signupFormContext.data.form.getInputProps('country')} />
			<Checkbox label={t('auth.SignupForm.fields.send_newsletter.label')} required={isRequiredFromZod(SignupFormValidation.shape.send_newsletter)} {...signupFormContext.data.form.getInputProps('send_newsletter', { type: 'checkbox' })} />
		</FormSection>
	);
}
