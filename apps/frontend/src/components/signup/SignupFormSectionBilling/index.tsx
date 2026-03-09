'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionBilling() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	return (
		<FormSection description={t('auth.SignupForm.sections.billing.description')} title={t('auth.SignupForm.sections.billing.title')}>
			<TextInput description={t('auth.SignupForm.fields.billing_name.description')} label={t('auth.SignupForm.fields.billing_name.label')} placeholder={t('auth.SignupForm.fields.billing_name.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_name)} {...signupFormContext.data.form.getInputProps('billing_name')} />
			<TextInput description={t('auth.SignupForm.fields.billing_tax_id.description')} label={t('auth.SignupForm.fields.billing_tax_id.label')} placeholder={t('auth.SignupForm.fields.billing_tax_id.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_tax_id)} type="number" {...signupFormContext.data.form.getInputProps('billing_tax_id')} />
			<TextInput description={t('auth.SignupForm.fields.billing_address_1.description')} label={t('auth.SignupForm.fields.billing_address_1.label')} placeholder={t('auth.SignupForm.fields.billing_address_1.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_address_1)} {...signupFormContext.data.form.getInputProps('billing_address_1')} />
			<TextInput label={t('auth.SignupForm.fields.billing_address_2.label')} placeholder={t('auth.SignupForm.fields.billing_address_2.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_address_2)} {...signupFormContext.data.form.getInputProps('billing_address_2')} />
			<TextInput label={t('auth.SignupForm.fields.billing_postal_code.label')} placeholder={t('auth.SignupForm.fields.billing_postal_code.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_postal_code)} {...signupFormContext.data.form.getInputProps('billing_postal_code')} />
			<TextInput label={t('auth.SignupForm.fields.billing_city.label')} placeholder={t('auth.SignupForm.fields.billing_city.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.billing_city)} {...signupFormContext.data.form.getInputProps('billing_city')} />
		</FormSection>
	);
}
