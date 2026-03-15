'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { SignupFormSectionEnrolmentAffiliate } from '@/components/signup/SignupFormSectionEnrolmentAffiliate';
import { SignupFormSectionEnrolmentEffective } from '@/components/signup/SignupFormSectionEnrolmentEffective';
import { UserOptions } from '@/services/payload/collections/User/options';
import { Radio } from '@mantine/core';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionEnrolment() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	return (
		<FormSection description={t('auth.SignupForm.sections.enrolment.description')} title={t('auth.SignupForm.sections.enrolment.title')}>

			<Radio.Group label={t('auth.SignupForm.fields.medical_specialty.label')} {...signupFormContext.data.form.getInputProps('medical_specialty')}>
				{UserOptions.medical_specialty.map(item => (
					<Radio
						key={item.value}
						description={t(`auth.SignupForm.fields.medical_specialty.options.${item.value}.description`)}
						label={t(`auth.SignupForm.fields.medical_specialty.options.${item.value}.label`)}
						value={item.value}
					/>
				))}
			</Radio.Group>

			{signupFormContext.data.form.values.medical_specialty === 'gynecology' && (
				<SignupFormSectionEnrolmentEffective />
			)}

			{signupFormContext.data.form.values.medical_specialty && signupFormContext.data.form.values.medical_specialty !== 'gynecology' && (
				<SignupFormSectionEnrolmentAffiliate />
			)}

		</FormSection>
	);
}
