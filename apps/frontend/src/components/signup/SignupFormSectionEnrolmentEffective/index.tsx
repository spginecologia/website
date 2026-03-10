'use client';

/* * */

import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { SignupFormSponsorInput } from '@/components/signup/SignupFormSponsorInput';
import { ActionIcon, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

/* * */

export function SignupFormSectionEnrolmentEffective() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Handle actions

	const handleAddSponsor = () => {
		const currentSponsors = signupFormContext.data.form.getValues().enrolment_sponsors ?? [];
		if (currentSponsors.length >= 5) return; // Limit to 5 sponsors
		signupFormContext.data.form.insertListItem('enrolment_sponsors', { is_valid: false, tax_id: '' });
	};

	const handleRemoveSponsor = (index: number) => {
		signupFormContext.data.form.removeListItem('enrolment_sponsors', index);
	};

	//
	// C. Render components

	return (
		<>

			<div style={{ alignItems: 'center', display: 'flex', gap: 10 }}>
				<Text size="sm">{t('auth.SignupForm.fields.enrolment_sponsors.description')}</Text>
			</div>

			{signupFormContext.data.form.values.enrolment_sponsors?.map((sponsor, index) => (
				<SignupFormSponsorInput
					key={index}
					index={index}
					onChange={value => signupFormContext.data.form.setFieldValue(`enrolment_sponsors.${index}.tax_id`, value)}
					onRemove={() => handleRemoveSponsor(index)}
					onValidate={valid => signupFormContext.data.form.setFieldValue(`enrolment_sponsors.${index}.is_valid`, valid)}
					value={sponsor.tax_id}
				/>
			))}

			<ActionIcon onClick={handleAddSponsor}>
				<IconPlus />
			</ActionIcon>

		</>
	);
}
