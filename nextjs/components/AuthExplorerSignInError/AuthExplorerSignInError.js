'use client';

/* * */

import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/translations/navigation';
import { useTranslations } from 'next-intl';
import styles from './AuthExplorerSignInError.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';
import { useMemo } from 'react';
import { Space } from '@mantine/core';

/* * */

export default function AuthExplorerSignInError() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('AuthExplorerSignInError');

  //
  // B. Transform data

  const errorMessage = useMemo(() => {
    switch (searchParams.get('error')) {
      case 'Configuration':
        return t('error_type.Configuration.message');
      case 'AccessDenied':
        return t('error_type.AccessDenied.message');
      case 'Verification':
        return t('error_type.Verification.message');
      default:
        return t('error_type.unknown.message');
    }
  }, []);

  const errorAction = useMemo(() => {
    switch (searchParams.get('error')) {
      case 'Configuration':
        return t('error_type.Configuration.action');
      case 'AccessDenied':
        return t('error_type.AccessDenied.action');
      case 'Verification':
        return t('error_type.Verification.action');
      default:
        return t('error_type.unknown.action');
    }
  }, []);

  //
  // C. Handle actions

  const handleSignInRetry = () => {
    router.push('/login');
  };

  //
  // D. Render components

  return (
    <div className={styles.container}>
      <Title level="h2" text={t('title')} />
      <Space />
      <p className={styles.errorMessage}>{errorMessage}</p>
      <Text text={errorAction} />
      <Space />
      <Button label={t('retry')} onClick={handleSignInRetry} />
    </div>
  );

  //
}
