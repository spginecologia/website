'use client';

/* * */

import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { Textarea, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionEnrolmentAffiliate() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	return (
		<>

			<TextInput
				label={t('auth.SignupForm.fields.medical_specialty_other.label')}
				placeholder={t('auth.SignupForm.fields.medical_specialty_other.placeholder')}
				required={isRequiredFromZod(SignupFormValidation.shape.medical_specialty_other)}
				{...signupFormContext.data.form.getInputProps('medical_specialty_other')}
			/>

			<Textarea
				label={t('auth.SignupForm.fields.enrolment_curriculum.label')}
				placeholder={t('auth.SignupForm.fields.enrolment_curriculum.placeholder')}
				required={isRequiredFromZod(SignupFormValidation.shape.enrolment_curriculum)}
				{...signupFormContext.data.form.getInputProps('enrolment_curriculum')}
				minRows={3}
				autosize
			/>

		</>
	);
}
