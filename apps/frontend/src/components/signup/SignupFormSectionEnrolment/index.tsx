'use client';

/* * */

import { FormSection } from '@/components/common/FormSection';
import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { SignupFormSponsorInput } from '@/components/signup/SignupFormSponsorInput';
import { isRequiredFromZod } from '@/services/general/is-required-from-zod';
import { SignupFormValidation } from '@/services/payload/collections/Signup/validation';
import { UserOptions } from '@/services/payload/collections/User/options';
import { ActionIcon, Radio, Text, TextInput } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionEnrolment() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// C. Handle actions

	const handleAddSponsor = () => {
		const currentSponsors = signupFormContext.data.form.getValues().enrolment_sponsors ?? [];
		if (currentSponsors.length >= 5) return; // Limit to 5 sponsors
		signupFormContext.data.form.insertListItem('enrolment_sponsors', { is_valid: false, tax_id: '' });
	};

	const handleRemoveSponsor = (index: number) => {
		signupFormContext.data.form.removeListItem('enrolment_sponsors', index);
	};

	//
	// B. Render components

	return (
		<FormSection description={t('auth.SignupForm.sections.enrolment.description')} title={t('auth.SignupForm.sections.enrolment.title')}>
			<Radio.Group label={t('auth.SignupForm.fields.medical_specialty.label')} {...signupFormContext.data.form.getInputProps('medical_specialty')}>
				{UserOptions.medical_specialty.map(item => (
					<Radio
						key={item.value}
						description={item.value}
						label={item.label}
						value={item.value}
					/>
				))}
			</Radio.Group>
			{signupFormContext.data.form.values.medical_specialty === 'gynecology' && (
				<>
					<div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
						<Text size="sm">{t('auth.SignupForm.fields.enrolment_sponsors.description')}</Text>
						<ActionIcon onClick={handleAddSponsor}>
							<IconPlus />
						</ActionIcon>
					</div>
					{signupFormContext.data.form.values.enrolment_sponsors?.map((sponsor, index) => (
						<div key={index} style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
							<SignupFormSponsorInput
								onChange={value => signupFormContext.data.form.setFieldValue(`enrolment_sponsors.${index}.tax_id`, value)}
								onValidate={valid => signupFormContext.data.form.setFieldValue(`enrolment_sponsors.${index}.is_valid`, valid)}
								value={sponsor.tax_id}
							/>
							<ActionIcon onClick={() => handleRemoveSponsor(index)}>
								<IconMinus />
							</ActionIcon>
						</div>
					))}
				</>
			)}
			{signupFormContext.data.form.values.medical_specialty && signupFormContext.data.form.values.medical_specialty !== 'gynecology' && (
				<>
					<TextInput label={t('auth.SignupForm.fields.medical_specialty_other.label')} placeholder={t('auth.SignupForm.fields.medical_specialty_other.placeholder')} required={isRequiredFromZod(SignupFormValidation.shape.medical_specialty_other)} {...signupFormContext.data.form.getInputProps('medical_specialty_other')} />
				</>
			)}
		</FormSection>
	);
}
