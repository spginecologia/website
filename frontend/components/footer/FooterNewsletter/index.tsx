'use client';

/* * */

import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

export function FooterNewsletter() {
	//

	//
	// A. Setup variables

	const t = useTranslations('footer.FooterNewsletter');

	//
	// C. Setup form

	const form = useForm({
		clearInputErrorOnChange: true,
		validateInputOnBlur: true,
		validateInputOnChange: true,
		// validate: yupResolver(AgencyValidation),
		// initialValues: AgencyDefault,
	});

	//
	// B. Handle actions

	const handleFormValidate = () => {
		form.validate();
	};

	const handleFormSubmit = async () => {
		try {
			//   setIsSaving(true);
			//   //   await API({ service: 'agencies', resourceId: agency_id, operation: 'edit', method: 'PUT', body: form.values });
			//   agencyMutate();
			//   allAgenciesMutate();
			//   form.resetDirty();
			//   setIsSaving(false);
			//   setIsLocking(false);
			//   setHasErrorSaving(false);
		}
		catch (err) {
			console.log(err);
			//   setIsSaving(false);
			//   setIsLocking(false);
			//   setHasErrorSaving(err);
		}
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>{t('title')}</h3>
				<h3 className={styles.subtitle}>{t('subtitle')}</h3>
			</div>
			<form className={styles.form} onSubmit={form.onSubmit(handleFormSubmit)}>
				<TextInput aria-label={t('form.name.label')} placeholder={t('form.name.placeholder')} variant="contrast" {...form.getInputProps('name')} />
				<TextInput aria-label={t('form.email.label')} placeholder={t('form.email.placeholder')} variant="contrast" {...form.getInputProps('email')} />
			</form>
		</div>
	);
}
