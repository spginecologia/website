'use client';

/* * */

import { useRouter } from 'next-intl/client';
import { useTranslations } from 'next-intl';
import styles from './AuthExplorerSignInVerify.module.css';
import Title from '@/components/Title/Title';
import Text from '@/components/Text/Text';
import Button from '@/components/Button/Button';
import { Space } from '@mantine/core';

/* * */

export default function AuthExplorerSignInVerify() {
  //

  //
  // A. Setup variables

  const router = useRouter();
  const t = useTranslations('AuthExplorerSignInVerify');

  //
  // B. Handle actions

  const handleSignInRetry = () => {
    router.push('/login');
  };

  //
  // C. Render components

  return (
    <div className={styles.container}>
      <Title level="h2" text={t('title')} />
      <Text text={t('subtitle')} />
      <Space />
      <Button variant="muted" label={t('retry')} onClick={handleSignInRetry} />
    </div>
  );

  //
}
