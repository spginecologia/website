'use client';

/* * */

import { useSignupFormContext } from '@/components/signup/SignupForm.context';
import { SignupFormSectionActivity } from '@/components/signup/SignupFormSectionActivity';
import { SignupFormSectionBasic } from '@/components/signup/SignupFormSectionBasic';
import { SignupFormSectionBilling } from '@/components/signup/SignupFormSectionBilling';
import { SignupFormSectionCorrespondence } from '@/components/signup/SignupFormSectionCorrespondence';
import { SignupFormSectionEnrolment } from '@/components/signup/SignupFormSectionEnrolment';
import { SignupFormUserCreated } from '@/components/signup/SignupFormUserCreated';
import { SignupFormUserExists } from '@/components/signup/SignupFormUserExists';
import { type SignupForm } from '@/services/payload/collections/Signup/validation';
import { Button, Loader, Paper, Space, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

/* * */

export function SignupForm() {
	//

	//
	// A. Setup variables

	const { t } = useTranslation();

	const signupFormContext = useSignupFormContext();

	//
	// B. Render components

	if (signupFormContext.data.signup_response?.status === 'user_exists') {
		return <SignupFormUserExists />;
	}

	if (signupFormContext.data.signup_response?.status === 'user_created') {
		return <SignupFormUserCreated />;
	}

	return (
		<Paper className={styles.container} component="form" onSubmit={signupFormContext.actions.signup}>

			<Title order={2}>{t('auth.SignupForm.title')}</Title>
			<Text>{t('auth.SignupForm.subtitle')}</Text>

			<SignupFormSectionBasic />

			<SignupFormSectionBilling />

			<SignupFormSectionActivity />

			<SignupFormSectionCorrespondence />

			<SignupFormSectionEnrolment />

			{signupFormContext.flags.is_loading && <Loader />}

			{(!signupFormContext.flags.is_loading && signupFormContext.data.form.isDirty()) && <Button disabled={!signupFormContext.data.form.isValid()} type="submit">{t('auth.SignupForm.actions.submit.label')}</Button>}

			{(!signupFormContext.flags.is_loading && signupFormContext.flags.is_error) && (
				<>
					<Space h={5} />
					<Text variant="error">{t('auth.SignupForm.error')}</Text>
				</>
			)}

		</Paper>
	);

	//
}
