'use client';

/* * */

import { useTranslations } from 'next-intl';
import styles from './FrontendFooterNewsletter.module.css';
import { useForm, yupResolver } from '@mantine/form';
import { TextInput } from '@mantine/core';

/* * */

export default function FrontendFooterNewsletter() {
  //

  //
  // A. Setup variables

  const t = useTranslations('FrontendFooterNewsletter');

  //
  // C. Setup form

  const form = useForm({
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
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
    } catch (err) {
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
      <form onSubmit={form.onSubmit(handleFormSubmit)} className={styles.form}>
        <TextInput aria-label={t('form.name.label')} placeholder={t('form.name.placeholder')} {...form.getInputProps('name')} styles={{ input: styles.input }} />
        <TextInput aria-label={t('form.email.label')} placeholder={t('form.email.placeholder')} {...form.getInputProps('email')} className={styles.input} />
      </form>
    </div>
  );
}
