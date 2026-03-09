'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { UserOptions } from '@/services/payload/collections/User/options';
import { Checkbox, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionActivity() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	return (
		<FormSection description={t('auth.SignupForm.sections.activity.description')} title={t('auth.SignupForm.sections.activity.title')}>
			<TextInput label={t('auth.SignupForm.fields.workplace_primary.label')} placeholder={t('auth.SignupForm.fields.workplace_primary.placeholder')} {...signupFormContext.data.form.getInputProps('workplace_primary')} />
			<TextInput label={t('auth.SignupForm.fields.workplace_secondary.label')} placeholder={t('auth.SignupForm.fields.workplace_secondary.placeholder')} {...signupFormContext.data.form.getInputProps('workplace_secondary')} />
			<Checkbox.Group label={t('auth.SignupForm.fields.subscribed_sections.label')} {...signupFormContext.data.form.getInputProps('subscribed_sections')}>
				{UserOptions.subscribed_sections.map(section => (
					<Checkbox key={section.value} label={section.label} value={section.value} />
				))}
			</Checkbox.Group>
		</FormSection>
	);
}
