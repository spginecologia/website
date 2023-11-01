'use client';

/* * */

import { signIn } from 'next-auth/react';
import { Space } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { SignInDefault } from '@/schemas/SignIn/default';
import { SignInValidation } from '@/schemas/SignIn/validation';
import { useTranslations } from 'next-intl';
import styles from './AuthExplorerSignIn.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';
import TextField from '@/components/TextField/TextField';

/* * */

export default function AuthExplorerSignIn() {
  //

  //
  // A. Setup variables

  const t = useTranslations('AuthExplorerSignIn');

  //
  // B. Setup form

  const form = useForm({
    clearInputErrorOnChange: true,
    validate: yupResolver(SignInValidation),
    initialValues: SignInDefault,
  });

  //
  // C. Handle actions

  const handleSignIn = async () => {
    signIn('email', { email: form.values.email, callbackUrl: '/' });
  };

  //
  // D. Render components

  return (
    <form onSubmit={form.onSubmit(handleSignIn)} className={styles.container}>
      <Title level="h2" text={t('title')} />
      <Text text={t('subtitle')} />
      <Space h={5} />
      <TextField type="email" label={t('email.label')} placeholder={t('email.placeholder')} {...form.getInputProps('email')} />
      <Button type={'submit'} label={t('submit.label')} />
    </form>
  );
}
